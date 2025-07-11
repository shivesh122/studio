'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, LogOut, User, Settings } from 'lucide-react'
import { getCurrentUser } from '@/lib/data'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search skills or members..." className="w-full pl-9 md:w-80" />
      </div>
      <UserMenu />
    </header>
  )
}

function UserMenu() {
  const currentUser = getCurrentUser();
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const fallback = currentUser.name.split(' ').map(n => n[0]).join('');
  const router = useRouter();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('user_avatar_url');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
    
    // Listen for storage changes to update avatar in real-time if profile is edited in another tab
    const handleStorageChange = () => {
        const updatedAvatar = localStorage.getItem('user_avatar_url');
        if (updatedAvatar) {
            setAvatarUrl(updatedAvatar);
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.dataAiHint} key={avatarUrl}/>
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
