'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser } from '@/lib/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SidebarUserProfile() {
    const currentUser = getCurrentUser();
    const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('user_avatar_url');
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        }

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

    return (
         <Link href="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent">
            <Avatar className="h-9 w-9">
                <AvatarImage src={avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.dataAiHint} key={avatarUrl} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">View profile</p>
            </div>
        </Link>
    );
}
