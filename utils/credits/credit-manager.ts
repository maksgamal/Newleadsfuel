import { createSupabaseServerClient } from '@/utils/supabase/server'
import { supabase } from '@/utils/supabase/client'
import type { Database } from '@/types/database.types'

export interface CreditTransaction {
  id: string
  user_id: string
  type: string
  amount: number
  related_entity_id: string | null
  created_at: string
}

export interface CreditDeductionResult {
  success: boolean
  error?: string
  transaction_id?: string
  previous_balance?: number
  new_balance?: number
  amount_deducted?: number
}

export interface CreditAdditionResult {
  success: boolean
  error?: string
  transaction_id?: string
  previous_balance?: number
  new_balance?: number
  amount_added?: number
}

/**
 * Server-side credit management functions
 */
export class ServerCreditManager {
  private supabase: any

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient
  }

  /**
   * Safely deduct credits with transaction logging
   */
  async deductCredits(
    userId: string,
    amount: number,
    type: string,
    relatedEntityId?: string
  ): Promise<CreditDeductionResult> {
    try {
      const { data, error } = await this.supabase.rpc('deduct_credits', {
        p_user_id: userId,
        p_amount: amount,
        p_type: type,
        p_related_entity_id: relatedEntityId || null
      })

      if (error) {
        console.error('Error deducting credits:', error)
        return {
          success: false,
          error: error.message
        }
      }

      return data as CreditDeductionResult
    } catch (error) {
      console.error('Unexpected error deducting credits:', error)
      return {
        success: false,
        error: 'An unexpected error occurred'
      }
    }
  }

  /**
   * Add credits (for purchases, bonuses, etc.)
   */
  async addCredits(
    userId: string,
    amount: number,
    type: string = 'purchase',
    relatedEntityId?: string
  ): Promise<CreditAdditionResult> {
    try {
      const { data, error } = await this.supabase.rpc('add_credits', {
        p_user_id: userId,
        p_amount: amount,
        p_type: type,
        p_related_entity_id: relatedEntityId || null
      })

      if (error) {
        console.error('Error adding credits:', error)
        return {
          success: false,
          error: error.message
        }
      }

      return data as CreditAdditionResult
    } catch (error) {
      console.error('Unexpected error adding credits:', error)
      return {
        success: false,
        error: 'An unexpected error occurred'
      }
    }
  }

  /**
   * Get user's current credit balance
   */
  async getCreditBalance(userId: string): Promise<number> {
    try {
      const { data, error } = await this.supabase.rpc('get_credit_balance', {
        p_user_id: userId
      })

      if (error) {
        console.error('Error getting credit balance:', error)
        return 0
      }

      return data || 0
    } catch (error) {
      console.error('Unexpected error getting credit balance:', error)
      return 0
    }
  }

  /**
   * Get user's credit transaction history
   */
  async getCreditTransactions(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<CreditTransaction[]> {
    try {
      const { data, error } = await this.supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error getting credit transactions:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Unexpected error getting credit transactions:', error)
      return []
    }
  }

  /**
   * Get total credits used in a time period
   */
  async getTotalCreditsUsed(
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<number> {
    try {
      const { data, error } = await this.supabase.rpc('get_total_credits_used', {
        p_user_id: userId,
        p_start_date: startDate?.toISOString() || null,
        p_end_date: endDate?.toISOString() || null
      })

      if (error) {
        console.error('Error getting total credits used:', error)
        return 0
      }

      return data || 0
    } catch (error) {
      console.error('Unexpected error getting total credits used:', error)
      return 0
    }
  }
}

/**
 * Client-side credit management functions
 */
export class ClientCreditManager {
  private supabase: any

  constructor() {
    this.supabase = supabase
  }

  /**
   * Get user's current credit balance (client-side)
   */
  async getCreditBalance(): Promise<number> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return 0

      const { data, error } = await this.supabase.rpc('get_credit_balance', {
        p_user_id: user.id
      })

      if (error) {
        console.error('Error getting credit balance:', error)
        return 0
      }

      return data || 0
    } catch (error) {
      console.error('Unexpected error getting credit balance:', error)
      return 0
    }
  }

  /**
   * Get user's credit transaction history (client-side)
   */
  async getCreditTransactions(
    limit: number = 50,
    offset: number = 0
  ): Promise<CreditTransaction[]> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await this.supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Error getting credit transactions:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Unexpected error getting credit transactions:', error)
      return []
    }
  }

  /**
   * Check if user has sufficient credits
   */
  async hasSufficientCredits(requiredAmount: number): Promise<boolean> {
    const balance = await this.getCreditBalance()
    return balance >= requiredAmount
  }
}

/**
 * Create server-side credit manager instance
 */
export async function createServerCreditManager() {
  const supabaseClient = await createSupabaseServerClient()
  return new ServerCreditManager(supabaseClient)
}

/**
 * Create client-side credit manager instance
 */
export function createClientCreditManager() {
  return new ClientCreditManager()
}

/**
 * Credit cost constants
 */
export const CREDIT_COSTS = {
  UNLOCK_EMAIL: 2,
  UNLOCK_PHONE: 5,
} as const

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  UNLOCK_EMAIL: 'unlock_email',
  UNLOCK_PHONE: 'unlock_phone',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  BONUS: 'bonus',
  ADJUSTMENT: 'adjustment',
} as const