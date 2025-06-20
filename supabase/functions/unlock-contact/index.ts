import { createClient } from 'npm:@supabase/supabase-js@2'
import { ServerCreditManager, CREDIT_COSTS, TRANSACTION_TYPES } from '../../../utils/credits/credit-manager.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface UnlockRequest {
  contactId: string
  type: 'email' | 'phone'
  contactData?: {
    name: string
    company: string
    title: string
  }
}

interface UnlockResponse {
  success: boolean
  data?: {
    email?: string
    phone?: string
  }
  error?: string
  transaction_id?: string
  new_balance?: number
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const { contactId, type, contactData }: UnlockRequest = await req.json()

    // Validate request
    if (!contactId || !type || !['email', 'phone'].includes(type)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid request parameters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Determine credit cost
    const creditCost = type === 'email' ? CREDIT_COSTS.UNLOCK_EMAIL : CREDIT_COSTS.UNLOCK_PHONE
    const transactionType = type === 'email' ? TRANSACTION_TYPES.UNLOCK_EMAIL : TRANSACTION_TYPES.UNLOCK_PHONE

    // Create credit manager
    const creditManager = new ServerCreditManager(supabase)

    // Check if user has sufficient credits
    const currentBalance = await creditManager.getCreditBalance(user.id)
    if (currentBalance < creditCost) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Insufficient credits',
          current_balance: currentBalance,
          required: creditCost
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if this contact data has already been unlocked by this user
    const existingTransactions = await supabase
      .from('credit_transactions')
      .select('id')
      .eq('user_id', user.id)
      .eq('type', transactionType)
      .eq('related_entity_id', contactId)
      .limit(1)

    if (existingTransactions.data && existingTransactions.data.length > 0) {
      // Already unlocked, return the data without charging again
      const unlockedData = generateUnlockedData(type, contactData)
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: unlockedData,
          message: 'Already unlocked (no charge)',
          new_balance: currentBalance
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Deduct credits
    const deductionResult = await creditManager.deductCredits(
      user.id,
      creditCost,
      transactionType,
      contactId
    )

    if (!deductionResult.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: deductionResult.error || 'Failed to deduct credits'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate unlocked data (in a real app, this would come from your data sources)
    const unlockedData = generateUnlockedData(type, contactData)

    // Return success response
    const response: UnlockResponse = {
      success: true,
      data: unlockedData,
      transaction_id: deductionResult.transaction_id,
      new_balance: deductionResult.new_balance
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in unlock-contact function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

/**
 * Generate mock unlocked data (replace with real data source integration)
 */
function generateUnlockedData(type: 'email' | 'phone', contactData?: any) {
  if (type === 'email') {
    // Generate a realistic email based on contact data
    if (contactData?.name && contactData?.company) {
      const firstName = contactData.name.split(' ')[0].toLowerCase()
      const lastName = contactData.name.split(' ')[1]?.toLowerCase() || ''
      const domain = contactData.company.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/inc|corp|llc|ltd/g, '') + '.com'
      
      return {
        email: `${firstName}.${lastName}@${domain}`
      }
    }
    return {
      email: 'contact@example.com'
    }
  } else {
    // Generate a realistic phone number
    const areaCode = Math.floor(Math.random() * 900) + 100
    const exchange = Math.floor(Math.random() * 900) + 100
    const number = Math.floor(Math.random() * 9000) + 1000
    
    return {
      phone: `+1 (${areaCode}) ${exchange}-${number}`
    }
  }
}