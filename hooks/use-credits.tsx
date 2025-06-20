'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/utils/supabase/context'
import { useAuth } from '@/hooks/use-auth'
import { createClientCreditManager } from '@/utils/credits/credit-manager'

interface CreditTransaction {
  id: string
  type: string
  amount: number
  contact_id?: number
  created_at: string
}

export function useCredits() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCreditData()
    }
  }, [user])

  const fetchCreditData = async () => {
    try {
      const creditManager = createClientCreditManager()
      
      // Fetch balance and transactions in parallel
      const [balance, transactions] = await Promise.all([
        creditManager.getCreditBalance(),
        creditManager.getCreditTransactions(10) // Get last 10 transactions
      ])

      setBalance(balance)
      setTransactions(transactions.map(t => ({
        id: t.id,
        type: t.type,
        amount: Math.abs(t.amount), // Show positive amounts for display
        contact_id: t.related_entity_id ? parseInt(t.related_entity_id) : undefined,
        created_at: t.created_at
      })))
    } catch (error) {
      console.error('Error fetching credit data:', error)
      // Set default values on error
      setBalance(0)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const unlockContact = async (
    contactId: string,
    type: 'email' | 'phone',
    contactData?: { name: string; company: string; title: string }
  ) => {
    try {
      const creditManager = createClientCreditManager()
      const result = await creditManager.unlockContact(contactId, type, contactData)
      
      if (result.success) {
        // Update balance
        if (result.new_balance !== undefined) {
          setBalance(result.new_balance)
        }
        
        // Refresh transactions
        await fetchCreditData()
      }
      
      return result
    } catch (error) {
      console.error('Error unlocking contact:', error)
      return { success: false, error: 'Failed to unlock contact' }
    }
  }

  const deductCredits = async (amount: number, type: string, contactId?: number) => {
    // This is now handled by the unlockContact method
    // Keeping for backward compatibility
    return unlockContact(contactId?.toString() || '', type as 'email' | 'phone')
  }

  return {
    balance,
    transactions,
    loading,
    unlockContact,
    deductCredits, // Deprecated, use unlockContact instead
    refetch: fetchCreditData,
  }
}