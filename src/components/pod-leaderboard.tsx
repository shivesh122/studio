// src/components/pod-leaderboard.tsx
'use client';

import { useMemo } from 'react';
import type { User } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PodLeaderboardProps = {
    members: User[];
};

export default function PodLeaderboard({ members }: PodLeaderboardProps) {
    const sortedMembers = useMemo(() => {
        return [...members].sort((a, b) => b.xp - a.xp);
    }, [members]);

    const getRankColor = (rank: number) => {
        if (rank === 0) return 'text-yellow-400';
        if (rank === 1) return 'text-gray-400';
        if (rank === 2) return 'text-amber-600';
        return 'text-muted-foreground';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pod Leaderboard</CardTitle>
                <CardDescription>See who the most active members are in this pod.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead>Member</TableHead>
                            <TableHead className="text-right">Level</TableHead>
                            <TableHead className="text-right">XP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMembers.map((member, index) => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium text-center">
                                    <div className="flex items-center justify-center">
                                        {index < 3 ? (
                                            <Trophy className={cn("h-5 w-5", getRankColor(index))} />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/profile/${member.id}`} className="flex items-center gap-3 group">
                                        <Avatar>
                                            <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium group-hover:text-primary">{member.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right">{member.level}</TableCell>
                                <TableCell className="text-right font-semibold">{member.xp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
