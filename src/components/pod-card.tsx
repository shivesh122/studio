
import type { Pod } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Hash, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";

type PodCardProps = {
    pod: Pod;
}

export default function PodCard({ pod }: PodCardProps) {

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col group">
            <CardHeader className="p-0">
                <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                    <Image 
                        src={pod.imageUrl}
                        alt={pod.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={pod.dataAiHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-xl font-headline">{pod.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mt-1 flex-grow">{pod.description}</p>
                
                 <div className="flex flex-wrap items-center gap-1.5 mt-4">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    {pod.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50 flex justify-between items-center rounded-b-lg">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{pod.members.length} Members</span>
                </div>
                 <Button asChild size="sm" variant="ghost">
                    <Link href={`/pods/${pod.id}`}>
                        View Pod <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
