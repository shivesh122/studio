import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/data";
import { Edit, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const user = getCurrentUser();

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                    <Image src="https://placehold.co/1200x400.png" alt="Profile banner" className="h-full w-full object-cover" layout="fill" data-ai-hint="abstract texture" />
                </div>
                <CardContent className="relative flex flex-col md:flex-row gap-6 p-6">
                    <div className="-mt-20 md:-mt-24">
                        <Avatar className="h-32 w-32 border-4 border-background">
                            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 pt-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                            <Button><Edit className="mr-2" /> Edit Profile</Button>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground mt-2">
                            <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {user.location}</div>
                            <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {user.email}</div>
                        </div>
                         <p className="mt-4 text-sm text-foreground/80">{user.bio}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Skills I Offer</CardTitle>
                        <CardDescription>These are the skills I can share with the community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-wrap gap-2">
                            {user.skillsOffered.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Skills I Want</CardTitle>
                        <CardDescription>These are the skills I'm interested in learning.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-wrap gap-2">
                            {user.skillsDesired.map(skill => <Badge key={skill} variant="outline" className="text-base py-1 px-3">{skill}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
