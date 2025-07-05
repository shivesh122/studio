'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getUserById, type Badge as BadgeType } from "@/lib/data";
import { Mail, MapPin, CalendarDays, Star, MessageCircle, ShieldCheck, Shield, Award, Sparkles, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import SendMessageButton from "@/components/send-message-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/review-card";
import { useEffect, useState, type FC } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const badgeIcons: Record<BadgeType['icon'], React.ElementType> = {
    Star: Star,
    Sparkles: Sparkles,
    Trophy: Trophy,
    Users: Users,
    Award: Award,
};

const BadgeIcon: FC<{ iconName: BadgeType['icon'], className?: string }> = ({ iconName, className }) => {
    const Icon = badgeIcons[iconName];
    return Icon ? <Icon className={className} /> : null;
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
    const user = getUserById(params.id);
    const currentUser = getCurrentUser();
    const isCurrentUserProfile = user?.id === currentUser.id;

    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);
    const [bannerUrl, setBannerUrl] = useState("https://placehold.co/1200x400.png");

    useEffect(() => {
        if (isCurrentUserProfile) {
            const savedAvatar = localStorage.getItem('user_avatar_url');
            const savedBanner = localStorage.getItem('user_banner_url');
            if (savedAvatar) {
                setAvatarUrl(savedAvatar);
            }
            if (savedBanner) {
                setBannerUrl(savedBanner);
            }
        }
    }, [isCurrentUserProfile, user]);

    if (!user) {
        notFound();
    }

    const totalReviews = user.reviews.length;
    const xpForNextLevel = user.level * 150;
    const xpForCurrentLevel = (user.level - 1) * 150;
    const currentLevelXp = user.xp - xpForCurrentLevel;
    const progress = (currentLevelXp / (xpForNextLevel - xpForCurrentLevel)) * 100;


    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                    <Image src={bannerUrl!} alt="Profile banner" fill style={{objectFit: "cover"}} className="object-cover" data-ai-hint="abstract pattern" key={bannerUrl} />
                </div>
                <CardContent className="relative flex flex-col md:flex-row gap-6 p-6">
                    <div className="-mt-20 md:-mt-24">
                        <Avatar className="h-32 w-32 border-4 border-background">
                            <AvatarImage src={avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} key={avatarUrl} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 pt-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                            {!isCurrentUserProfile && <SendMessageButton user={user} />}
                        </div>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-muted-foreground mt-2">
                            <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {user.location}</div>
                            <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {user.email}</div>
                            <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {user.availability.join(', ')}</div>
                        </div>
                         <p className="mt-4 text-sm text-foreground/80">{user.bio}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills Offered</CardTitle>
                            <CardDescription>Skills {user.name.split(' ')[0]} can share with the community.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-2">
                                {user.skillsOffered.map(skill => (
                                    <Badge key={skill.name} variant="secondary" className="text-base py-1 px-3">
                                        {skill.name} <span className="ml-1.5 font-normal opacity-75">({skill.level})</span>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Skills Wanted</CardTitle>
                            <CardDescription>Skills {user.name.split(' ')[0]} is interested in learning.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-2">
                                {user.skillsDesired.map(skill => (
                                    <Badge key={skill.name} variant="outline" className="text-base py-1 px-3">
                                       {skill.name} <span className="ml-1.5 font-normal opacity-75">({skill.level})</span>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Ratings & Reviews</CardTitle>
                                    <CardDescription>What others are saying about {user.name.split(' ')[0]}.</CardDescription>
                                </div>
                                {!isCurrentUserProfile && <Button variant="outline"><MessageCircle className="mr-2 h-4 w-4" /> Leave Review</Button>}
                            </div>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {totalReviews > 0 ? (
                                user.reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <p>No reviews yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gamification Stats</CardTitle>
                             <CardDescription>Reputation and progress on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                     <p className="font-semibold">Level {user.level}</p>
                                     <p className="text-sm text-muted-foreground">{user.xp} XP</p>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-full">
                                            <Progress value={progress} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{xpForNextLevel - user.xp} XP to next level</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                             <Separator />
                             <div>
                                <h4 className="font-semibold text-sm mb-3">Badges</h4>
                                {user.badges.length > 0 ? (
                                     <TooltipProvider>
                                        <div className="flex flex-wrap gap-4">
                                            {user.badges.map(badge => (
                                                <Tooltip key={badge.id}>
                                                    <TooltipTrigger className="flex flex-col items-center gap-1.5 text-center">
                                                        <div className="p-2.5 rounded-full bg-secondary">
                                                          <BadgeIcon iconName={badge.icon} className="h-5 w-5 text-secondary-foreground" />
                                                        </div>
                                                        <span className="text-xs font-medium w-16 truncate">{badge.name}</span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{badge.description}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </TooltipProvider>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No badges earned yet.</p>
                                )}
                             </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Trust & Verification</CardTitle>
                            <CardDescription>A measure of reputation on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-5xl font-bold">{user.trustScore.toFixed(1)}</p>
                                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                            </div>
                            <Separator />
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className={cn("flex items-center gap-3", user.verifications.email && "text-foreground")}>
                                    {user.verifications.email ? <ShieldCheck className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-muted-foreground" />}
                                    <span>Email Verified</span>
                                </li>
                                <li className={cn("flex items-center gap-3", user.verifications.mobile && "text-foreground")}>
                                    {user.verifications.mobile ? <ShieldCheck className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-muted-foreground" />}
                                    <span>Mobile Verified</span>
                                </li>
                                <li className={cn("flex items-center gap-3", user.verifications.id && "text-foreground")}>
                                    {user.verifications.id ? <ShieldCheck className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-muted-foreground" />}
                                    <span>ID Verified <span className="text-xs ">(Optional)</span></span>
                                </li>
                                <li className="flex items-center gap-3 text-foreground">
                                    <Star className="h-5 w-5 text-primary" />
                                    <span>{totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}</span>
                                </li>
                            </ul>
                            <Button variant="secondary" className="w-full">Dispute Resolution</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
