
// src/components/nav-links.tsx
"use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { Home, Users, MessageSquare, User as UserIcon, Sparkles, Video, Contact } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/members', icon: Users, label: 'Find Members' },
  { href: '/matcher', icon: Sparkles, label: 'Matcher' },
  { href: '/pods', icon: Contact, label: 'Community Pods' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/video-chat', icon: Video, label: 'Video Chat' },
  { href: '/profile', icon: UserIcon, label: 'My Profile' },
]

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref>
            <SidebarMenuButton isActive={pathname.startsWith(item.href) && (item.href !== '/profile' || pathname === '/profile')}>
              <item.icon />
              {item.label}
              {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
