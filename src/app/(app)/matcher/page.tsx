'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { getOtherUsers, type User } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Heart, Sparkles, X, Undo2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import MatcherCard from '@/components/matcher-card'

export default function MatcherPage() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [users, setUsers] = React.useState<User[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const { toast } = useToast()

  React.useEffect(() => {
    // In a real app, you'd fetch users who haven't been seen yet.
    // For now, we'll just use the mock data.
    setUsers(getOtherUsers())
  }, [])

  React.useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)
    
    // Initial setup
    handleSelect()

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const handleAction = (action: 'connect' | 'pass') => {
    if (!api || currentIndex >= users.length) return

    if (action === 'connect') {
      const user = users[currentIndex]
      toast({
        title: "It's a Match!",
        description: `You and ${user.name} can now message each other.`,
      })
    }
    
    api.scrollNext()
  }
  
  const hasMoreUsers = currentIndex < users.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
          <Sparkles className="text-primary"/>
          Matcher
        </h1>
        <p className="text-muted-foreground mt-1">Swipe to find your next skill swap partner.</p>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: false,
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {users.map((user) => (
              <CarouselItem key={user.id}>
                <MatcherCard user={user} />
              </CarouselItem>
            ))}
             <CarouselItem>
                <Card className="flex flex-col items-center justify-center text-center h-[550px]">
                    <CardHeader>
                        <CardTitle>That's everyone!</CardTitle>
                        <CardDescription>You've seen all available members. Check back later for new people to connect with.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => api?.scrollTo(0)}>
                            <Undo2 className="mr-2 h-4 w-4" />
                            Start Over
                        </Button>
                    </CardContent>
                </Card>
             </CarouselItem>
          </CarouselContent>
        </Carousel>

        {hasMoreUsers && (
            <div className="flex items-center gap-6">
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => handleAction('pass')}>
                    <X className="h-8 w-8"/>
                </Button>
                <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-2 border-primary/50 text-primary hover:bg-primary/10" onClick={() => handleAction('connect')}>
                    <Heart className="h-10 w-10"/>
                </Button>
            </div>
        )}
      </div>
    </div>
  )
}
