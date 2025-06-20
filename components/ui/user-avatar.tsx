'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

interface UserAvatarProps {
  user?: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  } | null
  size?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  }

  const getInitials = (email?: string, name?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return 'U'
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage 
        src={user?.user_metadata?.avatar_url} 
        alt={user?.user_metadata?.full_name || user?.email || 'User'} 
      />
      <AvatarFallback>
        {user ? (
          getInitials(user.email, user.user_metadata?.full_name)
        ) : (
          <User className="h-4 w-4" />
        )}
      </AvatarFallback>
    </Avatar>
  )
}