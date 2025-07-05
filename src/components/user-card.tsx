import type { User } from "@/lib/data";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

type UserCardProps = {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0">
                <Image src={user.avatarUrl} alt={user.name} width={300} height={200} className="w-full h-32 object-cover" data-ai-hint={user.dataAiHint} />
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <div className="text-sm text-muted-foreground mb-2 space-y-1">
                    <p>Offers: <Badge variant="secondary">{user.skillsOffered[0]}</Badge></p>
                    <p>Wants: <Badge variant="outline">{user.skillsDesired[0]}</Badge></p>
                </div>
                <div className="mt-auto">
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
