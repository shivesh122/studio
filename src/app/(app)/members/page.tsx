'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import UserCard from "@/components/user-card"
import { getOtherUsers, type User } from "@/lib/data"
import { Search, MapPin, Frown, Gem } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'


export default function MembersPage() {
  const otherUsers = useMemo(() => getOtherUsers(), []);

  // For demonstration, we'll simulate if the user has a Pro subscription.
  // In a real app, this would come from your user authentication data.
  const [isPro, setIsPro] = useState(false);

  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')

  const filteredUsers = useMemo(() => {
    return otherUsers.filter(user => {
      const searchMatch = searchQuery.trim() === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user.skillsDesired.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const locationMatch = locationQuery.trim() === '' ||
        user.location.toLowerCase().includes(locationQuery.toLowerCase());
      
      const availabilityMatch = !isPro || availabilityFilter === '' || user.availability.includes(availabilityFilter);

      const levelMatch = !isPro || levelFilter === '' ||
        user.skillsOffered.some(skill => skill.level === levelFilter) ||
        user.skillsDesired.some(skill => skill.level === levelFilter);
      
      const ratingMatch = !isPro || ratingFilter === '' || user.trustScore >= parseFloat(ratingFilter);

      return searchMatch && locationMatch && availabilityMatch && levelMatch && ratingMatch;
    });
  }, [otherUsers, searchQuery, locationQuery, availabilityFilter, levelFilter, ratingFilter, isPro]);

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    setter(value === 'all' ? '' : value);
  };

  const ProFilterWrapper = ({ children }: { children: React.ReactNode }) => (
      <div className="relative">
          {children}
          {!isPro && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md z-10">
                  <Button asChild variant="outline">
                      <Link href="/pricing">
                          <Gem className="mr-2 h-4 w-4 text-primary" /> Upgrade to Pro
                      </Link>
                  </Button>
              </div>
          )}
      </div>
  );

  return (
    <div className="space-y-8">
       <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground/90">Find Members</h1>
          <p className="text-muted-foreground mt-1">Browse and connect with other members in your community.</p>
        </div>
        <div className="flex items-center space-x-2 p-2 rounded-md border bg-card">
            <Switch id="pro-mode" checked={isPro} onCheckedChange={setIsPro} />
            <Label htmlFor="pro-mode" className="flex items-center gap-2 cursor-pointer">
              <Gem className="h-4 w-4 text-primary" />
              Pro Mode (Demo)
            </Label>
        </div>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-grow min-w-[200px] sm:min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search name or skill..." className="w-full pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="relative flex-grow min-w-[200px] sm:min-w-[240px]">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Filter by location..." className="w-full pl-9" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
                </div>
                <ProFilterWrapper>
                    <Select value={availabilityFilter} onValueChange={handleSelectChange(setAvailabilityFilter)} disabled={!isPro}>
                        <SelectTrigger className="flex-grow min-w-[180px]">
                            <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Availabilities</SelectItem>
                            <SelectItem value="Weekdays">Weekdays</SelectItem>
                            <SelectItem value="Weekends">Weekends</SelectItem>
                            <SelectItem value="Mornings">Mornings</SelectItem>
                            <SelectItem value="Afternoons">Afternoons</SelectItem>
                            <SelectItem value="Evenings">Evenings</SelectItem>
                        </SelectContent>
                    </Select>
                </ProFilterWrapper>
                <ProFilterWrapper>
                    <Select value={levelFilter} onValueChange={handleSelectChange(setLevelFilter)} disabled={!isPro}>
                        <SelectTrigger className="flex-grow min-w-[180px]">
                            <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>
                </ProFilterWrapper>
                <ProFilterWrapper>
                    <Select value={ratingFilter} onValueChange={handleSelectChange(setRatingFilter)} disabled={!isPro}>
                        <SelectTrigger className="flex-grow min-w-[180px]">
                            <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Rating</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                            <SelectItem value="4">4.0+ Stars</SelectItem>
                            <SelectItem value="3">3.0+ Stars</SelectItem>
                        </SelectContent>
                    </Select>
                </ProFilterWrapper>
            </div>
        </CardHeader>
        <CardContent>
            {filteredUsers.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
             ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                    <Frown className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-semibold">No Members Found</h3>
                    <p className="max-w-xs">Try adjusting your search filters to find more people in the community.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
