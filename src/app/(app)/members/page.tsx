import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import UserCard from "@/components/user-card"
import { getOtherUsers } from "@/lib/data"
import { Search } from "lucide-react"

export default function MembersPage() {
  const otherUsers = getOtherUsers()

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90">Find Members</h1>
        <p className="text-muted-foreground mt-1">Browse and connect with other members in your community.</p>
      </div>

      <Card>
        <CardHeader>
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or skill..." className="w-full pl-9 md:w-96" />
          </div>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {otherUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
