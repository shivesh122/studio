import type { User } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

type UserCardProps = {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    const fallback = user.name.split(' ').map(n => n[0]).join('');

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col text-center">
            <CardContent className="p-6 flex flex-col flex-grow items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl">{user.name}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                    <MapPin className="h-3.5 w-3.5" />
                    {user.location}
                </div>
                
                <div className="space-y-4 text-left w-full mb-6">
                    <div>
                        <h4 className="font-semibold text-sm mb-2 text-foreground/80">Skills they offer</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {user.skillsOffered.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-2 text-foreground/80">Skills they want</h4>
                        <div className="flex flex-wrap gap-1.5">
                             {user.skillsDesired.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto w-full">
                    <Button asChild size="sm" className="w-full">
                        <Link href={`/profile/${user.id}`}>
                            View Profile <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
