'use client'

import { useCredits } from '@/hooks/use-credits'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, TrendingUp, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export function CreditBalanceWidget() {
  const { balance, transactions, loading } = useCredits()

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isLowBalance = balance < 20
  const recentUsage = transactions.slice(0, 3).reduce((sum, t) => sum + t.credits_used, 0)

  return (
    <Card className={isLowBalance ? 'border-yellow-200 bg-yellow-50' : ''}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{balance}</div>
            {isLowBalance && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Low
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            {recentUsage > 0 ? (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {recentUsage} used recently
              </span>
            ) : (
              'No recent usage'
            )}
          </div>

          {isLowBalance && (
            <Link href="/billing">
              <Button size="sm" className="w-full">
                Top Up Credits
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}