'use client'

import { useState } from 'react'
import { useCredits } from '@/hooks/use-credits'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Phone, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

interface Contact {
  id: number
  name: string
  title: string
  company: string
  hasEmail: boolean
  hasPhone: boolean
}

interface ContactUnlockModalProps {
  contact: Contact | null
  type: 'email' | 'phone' | null
  isOpen: boolean
  onClose: () => void
  onSuccess: (data: { email?: string; phone?: string }) => void
}

export function ContactUnlockModal({
  contact,
  type,
  isOpen,
  onClose,
  onSuccess,
}: ContactUnlockModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { balance, unlockContact } = useCredits()
  
  const creditCost = type === 'email' ? 2 : type === 'phone' ? 5 : 0
  const hasEnoughCredits = balance >= creditCost

  const handleUnlock = async () => {
    if (!contact || !type || !hasEnoughCredits) return

    setLoading(true)
    setError('')
    
    try {
      const result = await unlockContact(
        contact.id.toString(),
        type,
        {
          name: contact.name,
          company: contact.company,
          title: contact.title
        }
      )
      
      if (result.success && result.data) {
        onSuccess(result.data)
        onClose()
      } else {
        setError(result.error || 'Failed to unlock contact')
      }
    } catch (error) {
      console.error('Error unlocking contact:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError('')
    onClose()
  }

  if (!contact || !type) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'email' ? (
              <Mail className="h-5 w-5 text-blue-600" />
            ) : (
              <Phone className="h-5 w-5 text-green-600" />
            )}
            Unlock {type === 'email' ? 'Email' : 'Phone Number'}
          </DialogTitle>
          <DialogDescription>
            Unlock the {type} for {contact.name} at {contact.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Credit Cost</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {creditCost} credits
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Your Balance</span>
              <span className="text-sm font-medium">{balance} credits</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!hasEnoughCredits && !error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Insufficient credits. You need {creditCost} credits but only have {balance}.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-gray-600">
            <p>
              This will deduct {creditCost} credits from your account and reveal the {type} 
              information for this contact. This action cannot be undone.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleUnlock}
            disabled={!hasEnoughCredits || loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              'Unlocking...'
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Unlock for {creditCost} Credits
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}