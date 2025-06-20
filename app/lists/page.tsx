'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, Download, Share } from 'lucide-react'

export default function ListsPage() {
  // Mock data for demonstration
  const mockLists = [
    {
      id: 1,
      name: 'Q1 Prospects',
      description: 'High-priority leads for Q1 outreach',
      contactCount: 45,
      isShared: false,
      createdAt: '2024-01-15',
      owner: 'You',
    },
    {
      id: 2,
      name: 'Tech Executives',
      description: 'CTOs and VPs from tech companies',
      contactCount: 23,
      isShared: true,
      createdAt: '2024-01-10',
      owner: 'Sarah Johnson',
    },
    {
      id: 3,
      name: 'West Coast Leads',
      description: 'Prospects from California, Oregon, Washington',
      contactCount: 67,
      isShared: false,
      createdAt: '2024-01-08',
      owner: 'You',
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lists</h1>
          <p className="text-gray-600 mt-2">Manage your lead collections</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLists.map((list) => (
          <Card key={list.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {list.description}
                  </CardDescription>
                </div>
                {list.isShared && (
                  <Badge variant="secondary" className="ml-2">
                    <Share className="h-3 w-3 mr-1" />
                    Shared
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {list.contactCount} contacts
                  </span>
                  <span>by {list.owner}</span>
                </div>
                
                <div className="text-xs text-gray-500">
                  Created {new Date(list.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state if no lists */}
      {mockLists.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No lists yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first list to start organizing your leads
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}