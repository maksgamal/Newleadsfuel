'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/utils/supabase/context'
import { useAuth } from '@/hooks/use-auth'

interface CreditTransaction {
  id: string
  type: string
  credits_used: number
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
      // In a real app, you'd fetch from your users table
      // For now, we'll use mock data
      setBalance(150)
      setTransactions([
        {
          id: '1',
          type: 'unlock_email',
          credits_used: 2,
          contact_id: 123,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'unlock_phone',
          credits_used: 5,
          contact_id: 124,
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
      ])
    } catch (error) {
      console.error('Error fetching credit data:', error)
    } finally {
      setLoading(false)
    }
  }

  const deductCredits = async (amount: number, type: string, contactId?: number) => {
    try {
      // In a real app, you'd make an API call to deduct credits
      setBalance(prev => Math.max(0, prev - amount))
      
      // Add transaction record
      const newTransaction: CreditTransaction = {
        id: Date.now().toString(),
        type,
        credits_used: amount,
        contact_id: contactId,
        created_at: new Date().toISOString(),
      }
      
      setTransactions(prev => [newTransaction, ...prev])
      
      return { success: true }
    } catch (error) {
      console.error('Error deducting credits:', error)
      return { success: false, error: 'Failed to deduct credits' }
    }
  }

  return {
    balance,
    transactions,
    loading,
    deductCredits,
    refetch: fetchCreditData,
  }
}