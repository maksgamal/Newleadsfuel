'use client'

import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Home,
  Search,
  Users,
  Building2,
  List,
  CreditCard,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navigation = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
    ],
  },
  {
    title: 'Prospecting',
    items: [
      { name: 'Prospect Leads', href: '/dashboard/prospector', icon: Search },
      { name: 'People', href: '/dashboard/people', icon: Users },
      { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Lists', href: '/dashboard/lists', icon: List },
      { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-4 py-2">
              <Image src="/codeguide-logo.png" alt="LeadFuel" width={32} height={32} />
              <span className="logo-text text-xl font-bold">LeadFuel</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {navigation.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                          className={cn(
                            'w-full justify-start',
                            pathname === item.href && 'bg-sidebar-accent text-sidebar-accent-foreground'
                          )}
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-4 py-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  }
                }}
              />
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">
                  {navigation
                    .flatMap(section => section.items)
                    .find(item => item.href === pathname)?.name || 'Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Credit Balance Widget */}
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Credits: 10</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}