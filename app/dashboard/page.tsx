'use client'

import { useAuth } from '@/hooks/use-auth'
import { CreditBalanceWidget } from '@/components/features/credit-balance-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Users, Activity, Search, Download, TrendingUp, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.email?.split('@')[0]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CreditBalanceWidget />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Unlocked</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 shared with team
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Total activities
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest lead prospecting activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email unlocked for John Doe</p>
                    <p className="text-sm text-muted-foreground">VP of Sales at TechCorp</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">2 credits</Badge>
                  <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Added 5 leads to "Q1 Prospects"</p>
                    <p className="text-sm text-muted-foreground">Bulk action completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">List Update</Badge>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Phone className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone unlocked for Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Marketing Director at Growth Co</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">5 credits</Badge>
                  <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Download className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Exported "Tech Leads" list</p>
                    <p className="text-sm text-muted-foreground">CSV format, 23 contacts</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">Export</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your most common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/prospect">
                <Button className="w-full justify-start" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Prospect New Leads
                </Button>
              </Link>
              <Link href="/lists">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Lists
                </Button>
              </Link>
              <Link href="/billing">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Purchase Credits
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}