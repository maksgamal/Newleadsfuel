'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

export default function ClerkClientProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          card: 'shadow-lg',
        },
        variables: {
          colorPrimary: '#4F46E5',
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
}