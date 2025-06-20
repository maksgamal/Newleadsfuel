'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/codeguide-logo.png" alt="CodeGuide" width={48} height={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Authentication Error</h1>
          <p className="text-gray-600 mt-2">There was a problem with your authentication</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Authentication Failed
            </CardTitle>
            <CardDescription>
              The authentication link may be invalid or expired
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                The authentication code in the URL is invalid or has expired. 
                This can happen if the link is old or has already been used.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Link href="/auth/signin">
                <Button className="w-full">
                  Try Signing In Again
                </Button>
              </Link>
              
              <Link href="/auth/forgot-password">
                <Button variant="outline" className="w-full">
                  Request New Password Reset
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}