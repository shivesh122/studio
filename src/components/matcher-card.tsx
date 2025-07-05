import type { User } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import Image from 'next/image'

type MatcherCardProps = {
  user: User
}

export default function MatcherCard({ user }: MatcherCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-xl h-[550px] flex flex-col">
        <div className="relative h-64 w-full">
            <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className="object-cover"
                data-ai-hint={user.dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-1.5 text-sm opacity-90">
                    <MapPin className="h-4 w-4" /> {user.location}
                </div>
            </div>
        </div>
      <CardContent className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h3 className="font-semibold text-sm mb-2 text-muted-foreground">About Me</h3>
          <p className="text-sm text-foreground/90 line-clamp-3">{user.bio}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Skills They Offer</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill) => (
              <Badge key={skill.name} variant="secondary">
                {skill.name} <span className="ml-1.5 font-normal opacity-75">({skill.level})</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Skills They Want</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsDesired.map((skill) => (
              <Badge key={skill.name} variant="outline">
                {skill.name} <span className="ml-1.5 font-normal opacity-75">({skill.level})</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
