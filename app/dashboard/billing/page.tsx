'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Zap,
  Check,
  Star,
  Calendar,
  Receipt,
  ArrowRight,
} from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription, credits, and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You're currently on the Free plan</CardDescription>
            </div>
            <Badge variant="secondary">Free Plan</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium">10 Lifetime Credits</span>
              </div>
              <Badge variant="outline">Never expires</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Perfect for getting started with lead prospecting. Upgrade anytime to unlock more features and credits.
            </p>
            <Button>
              Upgrade Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Available Plans</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Starter Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Starter
                <Badge variant="outline" size="sm">Popular</Badge>
              </CardTitle>
              <CardDescription>Perfect for individuals</CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$29</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  500 monthly credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced filters
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  CSV exports
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Email support
                </li>
              </ul>
              <Button className="w-full">Choose Starter</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Pro
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              </CardTitle>
              <CardDescription>For growing teams</CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  2,000 monthly credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Team collaboration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Shared lists
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full">Choose Pro</Button>
            </CardContent>
          </Card>

          {/* Business Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Business</CardTitle>
              <CardDescription>For larger organizations</CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$299</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  10,000 monthly credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  API access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Dedicated support
                </li>
              </ul>
              <Button className="w-full">Choose Business</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Custom solutions</CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold">Custom</div>
                <div className="text-sm text-muted-foreground">pricing</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Unlimited credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  SLA guarantee
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Account manager
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            <CardTitle>Billing History</CardTitle>
          </div>
          <CardDescription>Your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <Receipt className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No billing history yet</p>
              <p className="text-xs text-muted-foreground">
                Your invoices will appear here after your first payment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}