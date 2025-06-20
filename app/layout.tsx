import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'
import ClerkClientProvider from '@/components/providers/clerk-client-provider'
import { SupabaseProvider } from '@/utils/supabase/context'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'LeadFuel - B2B Lead Generation Platform',
  description: 'Discover, enrich, and engage high-quality B2B leads with advanced filtering and real-time data.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkClientProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TanstackClientProvider>
            <SupabaseProvider>
              {children}
            </SupabaseProvider>
          </TanstackClientProvider>
        </body>
      </html>
    </ClerkClientProvider>
  )
}