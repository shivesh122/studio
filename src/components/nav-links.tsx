// src/components/nav-links.tsx
"use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, Users, MessageSquare, User as UserIcon, Sparkles, Video, Contact, Gem, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/data'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/members', icon: Users, label: 'Find Members' },
  { href: '/matcher', icon: Sparkles, label: 'Matcher' },
  { href: '/pods', icon: Contact, label: 'Community Pods' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/video-chat', icon: Video, label: 'Video Chat' },
  { href: '/profile', icon: UserIcon, label: 'My Profile' },
  { href: '/admin', icon: Shield, label: 'Admin Dashboard' },
  { href: '/pricing', icon: Gem, label: 'Upgrade to Pro', isPro: true },
]

export default function NavLinks() {
  const pathname = usePathname();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.id === 'user-1';

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        if (item.href === '/admin' && !isAdmin) {
          return null;
        }

        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref>
              <SidebarMenuButton 
                  isActive={pathname.startsWith(item.href) && (item.href !== '/profile' || pathname === '/profile')}
                  className={item.isPro ? 'mt-4 text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary' : ''}
                >
                <item.icon />
                {item.label}
                {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  )
}
