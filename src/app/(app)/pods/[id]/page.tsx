
import { getPodById, getUsersByIds } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Hash, Users, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PodDetailPage({ params }: { params: { id: string } }) {
    const pod = getPodById(params.id);

    if (!pod) {
        notFound();
    }

    const members = getUsersByIds(pod.members);

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-56 w-full bg-muted">
                    <Image src={pod.imageUrl} alt={`${pod.name} banner`} fill style={{objectFit: "cover"}} className="object-cover" data-ai-hint={pod.dataAiHint} />
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
                </div>
            </Card>

            <Tabs defaultValue="chat" className="w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <TabsList>
                        <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
                        <TabsTrigger value="members"><Users className="mr-2 h-4 w-4" /> Members</TabsTrigger>
                        <TabsTrigger value="events"><Calendar className="mr-2 h-4 w-4" /> Events</TabsTrigger>
                    </TabsList>
                     <Button variant="outline"><Settings className="mr-2 h-4 w-4"/> Pod Settings</Button>
                </div>
                <TabsContent value="chat" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pod Chat</CardTitle>
                            <CardDescription>This is where conversations for {pod.name} will happen.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                <MessageSquare className="h-12 w-12 mb-4" />
                                <h3 className="text-xl font-semibold">Chat Coming Soon</h3>
                                <p className="max-w-xs">A dedicated space for pod members to communicate is on its way.</p>
                            </div>
                        </CardContent>
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
                        <CardHeader>
                            <CardTitle>Pod Events</CardTitle>
                            <CardDescription>Upcoming challenges and events for the {pod.name} pod.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                <Calendar className="h-12 w-12 mb-4" />
                                <h3 className="text-xl font-semibold">Events Coming Soon</h3>
                                <p className="max-w-xs">Plan and participate in pod-specific events and challenges.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
