import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Home, Users, MessageSquare, User as UserIcon, Bot, Edit, ExternalLink } from 'lucide-react'
import Header from '@/components/header'
import AiSuggestions from '@/components/ai-suggestions'
import Image from 'next/image'

const currentUser = {
  name: 'Alex Doe',
  avatarUrl: 'https://placehold.co/100x100.png',
  location: 'Greenwood',
  skillsOffered: ['Web Development', 'Graphic Design', 'Photography'],
  skillsDesired: ['Creative Writing', 'Data Analysis', 'Public Speaking'],
};

const otherUsers = [
  { id: '1', name: 'Jane Smith', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait', location: 'Greenwood', skillsOffered: ['Creative Writing', 'Marketing'], skillsDesired: ['Web Development'] },
  { id: '2', name: 'Bob Johnson', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait', location: 'Greenwood', skillsOffered: ['Data Analysis', 'Project Management'], skillsDesired: ['Graphic Design'] },
  { id: '3', name: 'Alice Williams', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait', location: 'Greenwood', skillsOffered: ['Gardening', 'Cooking', 'Yoga Instruction'], skillsDesired: ['Photography', 'Web Development'] },
  { id: '4', name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person portrait', location: 'Greenwood', skillsOffered: ['Public Speaking', 'Event Planning'], skillsDesired: ['Graphic Design'] },
];

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/20 border border-primary/30 text-primary rounded-lg flex items-center justify-center font-bold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat-2 h-5 w-5"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v7"/></svg>
              </div>
              <h1 className="font-semibold text-lg font-headline">SkillSwap Local</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users />
                  Find Members
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquare />
                  Messages
                  <Badge className="ml-auto">3</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <UserIcon />
                  My Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 p-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground cursor-pointer hover:underline">View profile</p>
                </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 space-y-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold font-headline text-foreground/90">Welcome back, {currentUser.name}!</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening in your community.</p>
            </div>

            <div className="grid gap-6 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Skill Profile</CardTitle>
                    <CardDescription>This is how others see you. Keep it updated!</CardDescription>
                  </div>
                   <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground/90">Skills I Offer</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.skillsOffered.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                      </div>
                    </div>
                     <div>
                      <h3 className="font-semibold mb-2 text-foreground/90">Skills I Want</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.skillsDesired.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AiSuggestions currentUser={currentUser} otherUsers={otherUsers} />

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Nearby Members in {currentUser.location}</CardTitle>
                  <CardDescription>Connect with skilled people in your area.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {otherUsers.map(user => (
                      <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-0">
                           <Image src={user.avatarUrl} alt={user.name} width={300} height={200} className="w-full h-32 object-cover" data-ai-hint={user.dataAiHint} />
                        </CardHeader>
                        <CardContent className="p-4">
                           <h3 className="font-bold text-lg">{user.name}</h3>
                           <p className="text-sm text-muted-foreground mb-2">Offers: {user.skillsOffered[0]}</p>
                           <Button size="sm" className="w-full">
                            View Profile <ExternalLink className="ml-2 h-4 w-4" />
                           </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
