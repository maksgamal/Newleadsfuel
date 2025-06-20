/*
  # Credit Management System Setup

  1. Database Functions
    - Safe credit deduction with transaction logging
    - Credit balance checking
    - Credit usage calculation
    - Automatic balance updates

  2. Triggers
    - Automatic credit balance updates on transactions
    - Transaction validation

  3. Additional Indexes
    - Performance optimization for credit operations
*/

-- Create function to safely deduct credits with transaction logging
CREATE OR REPLACE FUNCTION deduct_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT,
  p_related_entity_id TEXT DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  current_balance INTEGER;
  new_balance INTEGER;
  transaction_id UUID;
BEGIN
  -- Get current credit balance
  SELECT COALESCE(credit_balance, 0) INTO current_balance
  FROM customers 
  WHERE id = p_user_id;
  
  -- Check if user exists
  IF current_balance IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  -- Check if sufficient credits
  IF current_balance < p_amount THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Insufficient credits',
      'current_balance', current_balance,
      'required', p_amount
    );
  END IF;
  
  -- Calculate new balance
  new_balance := current_balance - p_amount;
  
  -- Start transaction
  BEGIN
    -- Insert transaction record
    INSERT INTO credit_transactions (
      user_id,
      type,
      amount,
      related_entity_id
    ) VALUES (
      p_user_id,
      p_type,
      -p_amount, -- Negative for deduction
      p_related_entity_id
    ) RETURNING id INTO transaction_id;
    
    -- Update user credit balance
    UPDATE customers 
    SET credit_balance = new_balance
    WHERE id = p_user_id;
    
    -- Return success
    RETURN jsonb_build_object(
      'success', true,
      'transaction_id', transaction_id,
      'previous_balance', current_balance,
      'new_balance', new_balance,
      'amount_deducted', p_amount
    );
    
  EXCEPTION WHEN OTHERS THEN
    -- Rollback handled automatically
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Transaction failed: ' || SQLERRM
    );
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to add credits (for purchases)
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT DEFAULT 'purchase',
  p_related_entity_id TEXT DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  current_balance INTEGER;
  new_balance INTEGER;
  transaction_id UUID;
BEGIN
  -- Get current credit balance
  SELECT COALESCE(credit_balance, 0) INTO current_balance
  FROM customers 
  WHERE id = p_user_id;
  
  -- Check if user exists
  IF current_balance IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;
  
  -- Calculate new balance
  new_balance := current_balance + p_amount;
  
  -- Start transaction
  BEGIN
    -- Insert transaction record
    INSERT INTO credit_transactions (
      user_id,
      type,
      amount,
      related_entity_id
    ) VALUES (
      p_user_id,
      p_type,
      p_amount, -- Positive for addition
      p_related_entity_id
    ) RETURNING id INTO transaction_id;
    
    -- Update user credit balance
    UPDATE customers 
    SET credit_balance = new_balance
    WHERE id = p_user_id;
    
    -- Return success
    RETURN jsonb_build_object(
      'success', true,
      'transaction_id', transaction_id,
      'previous_balance', current_balance,
      'new_balance', new_balance,
      'amount_added', p_amount
    );
    
  EXCEPTION WHEN OTHERS THEN
    -- Rollback handled automatically
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Transaction failed: ' || SQLERRM
    );
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user credit balance
CREATE OR REPLACE FUNCTION get_credit_balance(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  balance INTEGER;
BEGIN
  SELECT COALESCE(credit_balance, 0) INTO balance
  FROM customers 
  WHERE id = p_user_id;
  
  RETURN COALESCE(balance, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to calculate total credits used by user
CREATE OR REPLACE FUNCTION get_total_credits_used(
  p_user_id UUID,
  p_start_date TIMESTAMPTZ DEFAULT NULL,
  p_end_date TIMESTAMPTZ DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
  total_used INTEGER;
BEGIN
  SELECT COALESCE(SUM(ABS(amount)), 0) INTO total_used
  FROM credit_transactions
  WHERE user_id = p_user_id
    AND amount < 0 -- Only deductions
    AND (p_start_date IS NULL OR created_at >= p_start_date)
    AND (p_end_date IS NULL OR created_at <= p_end_date);
  
  RETURN COALESCE(total_used, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id_created_at 
ON credit_transactions(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_type 
ON credit_transactions(type);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_type 
ON credit_transactions(user_id, type);

CREATE INDEX IF NOT EXISTS idx_customers_credit_balance 
ON customers(credit_balance);

-- Create trigger to validate credit transactions
CREATE OR REPLACE FUNCTION validate_credit_transaction()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure amount is not zero
  IF NEW.amount = 0 THEN
    RAISE EXCEPTION 'Credit transaction amount cannot be zero';
  END IF;
  
  -- Ensure type is valid
  IF NEW.type NOT IN ('unlock_email', 'unlock_phone', 'purchase', 'refund', 'bonus', 'adjustment') THEN
    RAISE EXCEPTION 'Invalid transaction type: %', NEW.type;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_credit_transaction
  BEFORE INSERT ON credit_transactions
  FOR EACH ROW
  EXECUTE FUNCTION validate_credit_transaction();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION deduct_credits(UUID, INTEGER, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION add_credits(UUID, INTEGER, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_credit_balance(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_total_credits_used(UUID, TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;

-- Create RLS policies for credit_transactions
CREATE POLICY "Users can view own credit transactions"
  ON credit_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can insert own credit transactions via functions"
  ON credit_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = requesting_user_id());

-- Update customers RLS policy to allow credit balance updates
CREATE POLICY "Users can update own credit balance"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (id = requesting_user_id())
  WITH CHECK (id = requesting_user_id());

-- Insert default credit balance for existing users (if any)
UPDATE customers 
SET credit_balance = COALESCE(credit_balance, 10) 
WHERE credit_balance IS NULL;

-- Set default credit balance for new users
ALTER TABLE customers 
ALTER COLUMN credit_balance SET DEFAULT 10;