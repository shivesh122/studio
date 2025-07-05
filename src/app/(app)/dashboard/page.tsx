import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AiSuggestions from '@/components/ai-suggestions'
import { getCurrentUser, getOtherUsers } from '@/lib/data'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import UserCard from '@/components/user-card'

export default function DashboardPage() {
  const currentUser = getCurrentUser();
  const otherUsers = getOtherUsers().slice(0, 4); // Show only a few on the dashboard

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in your community.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Skill Profile</CardTitle>
              <CardDescription>This is how others see you. Keep it updated!</CardDescription>
            </div>
             <Button asChild variant="outline" size="sm">
                <Link href="/profile">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
            </Button>
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
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
