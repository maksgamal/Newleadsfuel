'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  List,
  Plus,
  Users,
  Building2,
  Download,
  Share,
  MoreHorizontal,
} from 'lucide-react'

export default function ListsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Lists</h1>
          <p className="text-muted-foreground">
            Organize and manage your prospect lists
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>

      {/* List Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>People Lists</CardTitle>
            </div>
            <CardDescription>
              Collections of individual contacts and prospects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Empty State */}
              <div className="text-center py-8">
                <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No people lists yet</p>
                <p className="text-xs text-muted-foreground">
                  Create your first list to start organizing contacts
                </p>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create People List
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Company Lists</CardTitle>
            </div>
            <CardDescription>
              Collections of target companies and organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Empty State */}
              <div className="text-center py-8">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No company lists yet</p>
                <p className="text-xs text-muted-foreground">
                  Create your first list to start organizing companies
                </p>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Company List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Lists */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Lists</CardTitle>
              <CardDescription>Your personal and shared lists</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">0 lists</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Empty State */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <List className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">No Lists Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Lists help you organize and manage your prospects. Create your first list to get started 
                  with organizing contacts and companies.
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create People List
                </Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Company List
                </Button>
              </div>
            </div>
          </div>

          {/* Sample List Items (hidden for now) */}
          <div className="hidden space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Tech Startup CEOs</h4>
                  <Badge variant="secondary" size="sm">People</Badge>
                  <Badge variant="outline" size="sm">Personal</Badge>
                </div>
                <p className="text-sm text-muted-foreground">25 contacts • Updated 2 days ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}