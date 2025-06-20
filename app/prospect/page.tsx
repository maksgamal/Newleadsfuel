'use client'

import { useState } from 'react'
import { ContactUnlockModal } from '@/components/features/contact-unlock-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Building, MapPin, Mail, Phone, Plus } from 'lucide-react'

interface Contact {
  id: number
  name: string
  title: string
  company: string
  location: string
  industry: string
  hasEmail: boolean
  hasPhone: boolean
  unlockedEmail?: string
  unlockedPhone?: string
}

export default function ProspectPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [unlockType, setUnlockType] = useState<'email' | 'phone' | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Mock data for demonstration
  const [mockResults, setMockResults] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Smith',
      title: 'VP of Sales',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      industry: 'Technology',
      hasEmail: true,
      hasPhone: true,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'Growth Solutions',
      location: 'New York, NY',
      industry: 'Marketing',
      hasEmail: true,
      hasPhone: false,
    },
    {
      id: 3,
      name: 'Mike Chen',
      title: 'CTO',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      industry: 'Software',
      hasEmail: false,
      hasPhone: true,
    },
  ])

  const handleUnlock = (contact: Contact, type: 'email' | 'phone') => {
    setSelectedContact(contact)
    setUnlockType(type)
    setModalOpen(true)
  }

  const handleUnlockSuccess = (data: { email?: string; phone?: string }) => {
    if (selectedContact) {
      setMockResults(prev => 
        prev.map(contact => 
          contact.id === selectedContact.id 
            ? { 
                ...contact, 
                unlockedEmail: data.email || contact.unlockedEmail,
                unlockedPhone: data.phone || contact.unlockedPhone
              }
            : contact
        )
      )
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lead Prospector</h1>
        <p className="text-gray-600 mt-2">Find and unlock high-quality leads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Industry</label>
                <div className="mt-2 space-y-2">
                  {['Technology', 'Marketing', 'Sales', 'Finance'].map((industry) => (
                    <label key={industry} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <div className="mt-2 space-y-2">
                  {['San Francisco', 'New York', 'Austin', 'Seattle'].map((location) => (
                    <label key={location} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Company Size</label>
                <div className="mt-2 space-y-2">
                  {['1-10', '11-50', '51-200', '200+'].map((size) => (
                    <label key={size} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{size} employees</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for leads by name, company, or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {mockResults.length} leads matching your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{result.name}</h3>
                          <Badge variant="secondary">{result.industry}</Badge>
                        </div>
                        <p className="text-gray-600 mb-1">{result.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {result.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {result.location}
                          </span>
                        </div>
                        
                        {/* Display unlocked data */}
                        {result.unlockedEmail && (
                          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-2 py-1 rounded mb-1">
                            <Mail className="h-4 w-4" />
                            {result.unlockedEmail}
                          </div>
                        )}
                        {result.unlockedPhone && (
                          <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            <Phone className="h-4 w-4" />
                            {result.unlockedPhone}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant={result.hasEmail && !result.unlockedEmail ? "default" : "outline"}
                          disabled={!result.hasEmail || !!result.unlockedEmail}
                          onClick={() => handleUnlock(result, 'email')}
                        >
                          {result.unlockedEmail ? (
                            'Email Unlocked'
                          ) : result.hasEmail ? (
                            'Unlock Email (2 credits)'
                          ) : (
                            'Email Unavailable'
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant={result.hasPhone && !result.unlockedPhone ? "default" : "outline"}
                          disabled={!result.hasPhone || !!result.unlockedPhone}
                          onClick={() => handleUnlock(result, 'phone')}
                        >
                          {result.unlockedPhone ? (
                            'Phone Unlocked'
                          ) : result.hasPhone ? (
                            'Unlock Phone (5 credits)'
                          ) : (
                            'Phone Unavailable'
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add to List
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ContactUnlockModal
        contact={selectedContact}
        type={unlockType}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleUnlockSuccess}
      />
    </div>
  )
}