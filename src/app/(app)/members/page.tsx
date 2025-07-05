'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import UserCard from "@/components/user-card"
import { getOtherUsers, type User } from "@/lib/data"
import { Search, MapPin, Frown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function MembersPage() {
  const otherUsers = useMemo(() => getOtherUsers(), []);

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

      const availabilityMatch = availabilityFilter === '' || user.availability.includes(availabilityFilter);

      const levelMatch = levelFilter === '' ||
        user.skillsOffered.some(skill => skill.level === levelFilter) ||
        user.skillsDesired.some(skill => skill.level === levelFilter);
      
      const ratingMatch = ratingFilter === '' || user.trustScore >= parseFloat(ratingFilter);

      return searchMatch && locationMatch && availabilityMatch && levelMatch && ratingMatch;
    });
  }, [otherUsers, searchQuery, locationQuery, availabilityFilter, levelFilter, ratingFilter]);

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    setter(value === 'all' ? '' : value);
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90">Find Members</h1>
        <p className="text-muted-foreground mt-1">Browse and connect with other members in your community.</p>
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
                <Select value={availabilityFilter} onValueChange={handleSelectChange(setAvailabilityFilter)}>
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
                <Select value={levelFilter} onValueChange={handleSelectChange(setLevelFilter)}>
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
                <Select value={ratingFilter} onValueChange={handleSelectChange(setRatingFilter)}>
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
