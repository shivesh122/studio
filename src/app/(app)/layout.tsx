import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Header from '@/components/header'
import { getCurrentUser } from '@/lib/data'
import NavLinks from '@/components/nav-links'
import Link from 'next/link'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = getCurrentUser();

  return (
    <div className="bg-background min-h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <h1 className="font-semibold text-xl font-headline">SkillSwap Pods</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <NavLinks />
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-2" />
            <Link href="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.dataAiHint} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">View profile</p>
                </div>
            </Link>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
