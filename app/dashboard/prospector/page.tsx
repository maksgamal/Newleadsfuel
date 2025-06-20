'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Users,
  Building2,
  MapPin,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Lock,
  Plus,
} from 'lucide-react'

export default function ProspectorPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Lead Prospector</h1>
        <p className="text-muted-foreground">
          Find and unlock high-quality B2B contacts with powerful search and filtering
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle className="text-lg">Filters</CardTitle>
              </div>
              <CardDescription>Refine your search criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Company, person, or keyword..." 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filter Categories */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Industry
                  </label>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Industry
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Company Size
                  </label>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Size Range
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Title
                  </label>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Title
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Technology
                  </label>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Technology
                  </Button>
                </div>
              </div>

              <Button className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>0 contacts found</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">0 results</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Empty State */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Start Your Search</h3>
                    <p className="text-muted-foreground max-w-md">
                      Use the filters on the left or enter search terms to find high-quality B2B contacts. 
                      You can search by company name, person name, job title, or keywords.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Popular searches:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        CEO Technology
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        Sales Director
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        Marketing Manager
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        Startup Founder
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Result Cards (for demonstration) */}
              <div className="hidden space-y-4">
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">John Smith</h4>
                        <Badge variant="outline" size="sm">Verified</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">CEO at TechCorp Inc.</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          San Francisco, CA
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          Technology
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Mail className="h-3 w-3" />
                        <Lock className="h-3 w-3" />
                        2 credits
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3 w-3" />
                        <Lock className="h-3 w-3" />
                        5 credits
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}