'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Download, Star } from 'lucide-react'

export default function BillingPage() {
  // Mock data for demonstration
  const currentPlan = {
    name: 'Starter',
    price: 29,
    credits: 500,
    usedCredits: 150,
    renewalDate: '2024-02-15',
  }

  const plans = [
    {
      name: 'Free',
      price: 0,
      credits: 10,
      features: ['10 lifetime credits', 'Basic search', 'Personal lists'],
      current: false,
    },
    {
      name: 'Starter',
      price: 29,
      credits: 500,
      features: ['500 monthly credits', 'Advanced filters', 'Team sharing', 'CSV export'],
      current: true,
    },
    {
      name: 'Pro',
      price: 99,
      credits: 2000,
      features: ['2000 monthly credits', 'All features', 'Priority support', 'API access'],
      current: false,
    },
    {
      name: 'Business',
      price: 299,
      credits: 10000,
      features: ['10000 monthly credits', 'Custom integrations', 'Dedicated support', 'White-label'],
      current: false,
    },
  ]

  const recentInvoices = [
    { id: 'INV-001', date: '2024-01-15', amount: 29, status: 'Paid' },
    { id: 'INV-002', date: '2023-12-15', amount: 29, status: 'Paid' },
    { id: 'INV-003', date: '2023-11-15', amount: 29, status: 'Paid' },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and billing information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-gray-600">${currentPlan.price}/month</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credits Used</span>
                  <span>{currentPlan.usedCredits} / {currentPlan.credits}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(currentPlan.usedCredits / currentPlan.credits) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Renews on {new Date(currentPlan.renewalDate).toLocaleDateString()}
              </div>
              
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common billing tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Buy Additional Credits
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download Invoices
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
            <CardDescription>Your usage statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Emails Unlocked</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Phones Unlocked</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Lists Created</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Exports</span>
              <span className="font-semibold">8</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`border rounded-lg p-4 ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.current && <Badge>Current</Badge>}
                  {plan.name === 'Pro' && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-600">/month</span>}
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {plan.credits} {plan.price === 0 ? 'lifetime' : 'monthly'} credits
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${invoice.amount}</span>
                  <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}