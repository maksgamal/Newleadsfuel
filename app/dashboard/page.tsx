'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  List,
  CreditCard,
  TrendingUp,
  Users,
  Building2,
  Zap,
  Activity,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your lead generation today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              Free lifetime credits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts Unlocked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lists</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Personal & shared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies Found</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ready to prospect
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Prospect Leads</CardTitle>
            </div>
            <CardDescription>
              Find and unlock high-quality B2B contacts with advanced filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/prospector">
              <Button className="w-full">
                Start Prospecting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Manage Lists</CardTitle>
            </div>
            <CardDescription>
              Create, organize, and share your prospect lists with your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/lists">
              <Button variant="outline" className="w-full">
                View Lists
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Top Up Credits</CardTitle>
            </div>
            <CardDescription>
              Purchase additional credits or upgrade your subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/billing">
              <Button variant="outline" className="w-full">
                Manage Billing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Usage Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>Your latest prospecting actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                  <p className="text-xs">Start prospecting to see your activity here</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <CardTitle>Usage Overview</CardTitle>
            </div>
            <CardDescription>Credit usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No usage data yet</p>
                  <p className="text-xs">Charts will appear after you start using credits</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Plan Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You're on the Free plan with lifetime credits</CardDescription>
            </div>
            <Badge variant="secondary">Free Plan</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">10 Lifetime Credits</p>
              <p className="text-xs text-muted-foreground">
                Perfect for getting started with lead prospecting
              </p>
            </div>
            <Link href="/dashboard/billing">
              <Button variant="outline">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}