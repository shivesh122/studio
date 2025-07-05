'use client';

import { getPodById, getUsersByIds, getUserById, getCurrentUser, getPodEvents, type Pod, type PodEvent, type User } from '@/lib/data';
import { getPodMessages, addPodMessage, type PodMessage } from '@/lib/messages';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Hash, Users, MessageSquare, Calendar, Settings, Camera, PlusCircle, Send, PartyPopper, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import PodLeaderboard from '@/components/pod-leaderboard';

export default function PodDetailPage({ params }: { params: { id: string } }) {
    // These are safe to call on client as they are just reading from a file
    const podData = getPodById(params.id);
    const currentUser = getCurrentUser();

    // State management
    const [pod, setPod] = useState<Pod | undefined>(podData);
    const [bannerUrl, setBannerUrl] = useState(pod?.imageUrl);
    const [messages, setMessages] = useState<PodMessage[]>([]);
    const [events, setEvents] = useState<PodEvent[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [members, setMembers] = useState<User[]>([]);
    
    // Refs
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load initial data and persisted state
    useEffect(() => {
        if (!pod) return;
        const savedBanner = localStorage.getItem(`pod_banner_url_${pod.id}`);
        if (savedBanner) {
            setBannerUrl(savedBanner);
        }
        setMessages(getPodMessages(pod.id));
        setEvents(getPodEvents(pod.id));
        setMembers(getUsersByIds(pod.members));
    }, [pod]);
    
    // Auto-scroll for chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!pod) {
        notFound();
    }


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && pod) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setBannerUrl(result);
                localStorage.setItem(`pod_banner_url_${pod.id}`, result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !pod) return;

        addPodMessage(pod.id, currentUser.id, newMessage);
        setMessages(getPodMessages(pod.id)); // Re-fetch messages to include the new one
        setNewMessage('');
    };

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-56 w-full bg-muted group">
                    <input
                        type="file"
                        ref={bannerInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <Image src={bannerUrl!} alt={`${pod.name} banner`} fill style={{objectFit: "cover"}} className="object-cover" data-ai-hint={pod.dataAiHint} key={bannerUrl} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-4xl font-bold font-headline">{pod.name}</h1>
                        <p className="max-w-xl mt-1 opacity-90">{pod.description}</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {pod.members.length} Members</div>
                             <div className="flex items-center gap-1.5 flex-wrap">
                                <Hash className="h-4 w-4" />
                                {pod.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => bannerInputRef.current?.click()}
                    >
                        <Camera className="mr-2 h-4 w-4" />
                        Change Banner
                    </Button>
                </div>
            </Card>

            <Tabs defaultValue="chat" className="w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <TabsList>
                        <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
                        <TabsTrigger value="members"><Users className="mr-2 h-4 w-4" /> Members</TabsTrigger>
                        <TabsTrigger value="events"><Calendar className="mr-2 h-4 w-4" /> Events</TabsTrigger>
                        <TabsTrigger value="leaderboard"><BarChart className="mr-2 h-4 w-4" /> Leaderboard</TabsTrigger>
                    </TabsList>
                     <Button variant="outline"><Settings className="mr-2 h-4 w-4"/> Pod Settings</Button>
                </div>
                <TabsContent value="chat" className="mt-4">
                    <Card className="h-[calc(100vh-450px)] flex flex-col">
                        <CardHeader>
                            <CardTitle>Pod Chat</CardTitle>
                            <CardDescription>Conversations for {pod.name}.</CardDescription>
                        </CardHeader>
                        <ScrollArea className="flex-1 px-6">
                            <div className="space-y-4">
                                {messages.map((message, index) => {
                                    const sender = getUserById(message.senderId);
                                    const showAvatarAndName = index === 0 || messages[index - 1].senderId !== message.senderId;
                                    
                                    if (!sender) return null;

                                    const isCurrentUser = sender.id === currentUser.id;

                                    return (
                                        <div key={message.id} className={cn("flex items-start gap-3", isCurrentUser && "justify-end")}>
                                            {!isCurrentUser && showAvatarAndName && (
                                                <Link href={`/profile/${sender.id}`}>
                                                  <Avatar className="h-10 w-10">
                                                      <AvatarImage src={sender.avatarUrl} alt={sender.name} data-ai-hint={sender.dataAiHint} />
                                                      <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                                                  </Avatar>
                                                </Link>
                                            )}
                                             {!isCurrentUser && !showAvatarAndName && (
                                                <div className="w-10 h-10 shrink-0" /> // Placeholder for alignment
                                            )}
                                            <div className={cn("flex flex-col w-full max-w-lg", isCurrentUser ? "items-end" : "items-start")}>
                                                {showAvatarAndName && !isCurrentUser && <p className="text-xs font-semibold mb-1 text-muted-foreground">{sender.name}</p>}
                                                <div className={cn(
                                                    "rounded-lg p-3",
                                                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                                                )}>
                                                    <p className="text-sm">{message.content}</p>
                                                     <p className={cn(
                                                        "text-xs mt-1 opacity-70",
                                                        isCurrentUser ? "text-right" : "text-left"
                                                        )}>
                                                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                        <CardFooter className="pt-4 border-t">
                            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
                                <Input 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..." 
                                    autoComplete="off"
                                />
                                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                                    <Send className="h-5 w-5" />
                                    <span className="sr-only">Send Message</span>
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="members" className="mt-4">
                    <Card>
                         <CardHeader>
                            <CardTitle>Members</CardTitle>
                            <CardDescription>The people who make up the {pod.name} pod.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {members.map(member => (
                                    <Link key={member.id} href={`/profile/${member.id}`} className="flex flex-col items-center gap-2 text-center group">
                                        <Avatar className="h-20 w-20 transition-transform group-hover:scale-105">
                                            <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-sm">
                                            <p className="font-semibold group-hover:text-primary">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.location}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="events" className="mt-4">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                             <div>
                                <CardTitle>Pod Events</CardTitle>
                                <CardDescription>Upcoming challenges and events for the {pod.name} pod.</CardDescription>
                            </div>
                            <Button><PlusCircle className="mr-2 h-4 w-4"/> Create Event</Button>
                        </CardHeader>
                        <CardContent>
                            {events.length > 0 ? (
                                <div className="space-y-4">
                                    {events.map(event => {
                                        const creator = getUserById(event.createdBy)
                                        return (
                                            <Card key={event.id} className="hover:shadow-md transition-shadow">
                                                <CardHeader>
                                                    <CardTitle>{event.title}</CardTitle>
                                                    <CardDescription>
                                                        {format(event.date, 'PPPP')}
                                                        {creator && ` • Created by ${creator.name}`}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button variant="outline">RSVP</Button>
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                    <PartyPopper className="h-12 w-12 mb-4" />
                                    <h3 className="text-xl font-semibold">No Events Yet</h3>
                                    <p className="max-w-xs">Be the first to create an event for this pod!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="leaderboard" className="mt-4">
                    <PodLeaderboard members={members} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
