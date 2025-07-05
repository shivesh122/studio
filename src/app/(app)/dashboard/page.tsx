'use client'

import { useMemo } from 'react'
import { getCurrentUser, getOtherUsers } from '@/lib/data'
import AiSuggestions from '@/components/ai-suggestions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Users, MessageSquare, Sparkles, Contact } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    const currentUser = useMemo(() => getCurrentUser(), [])
    const otherUsers = useMemo(() => getOtherUsers(), [])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
                    <LayoutDashboard className="text-primary"/>
                    Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">Welcome back, {currentUser.name.split(' ')[0]}! Here's a snapshot of your community activity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                            <CardDescription>Jump right back into the action.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <QuickLinkCard
                                href="/matcher"
                                icon={Sparkles}
                                title="Matcher"
                                description="Find new skill swap partners."
                            />
                             <QuickLinkCard
                                href="/messages"
                                icon={MessageSquare}
                                title="Messages"
                                description="Check your conversations."
                            />
                             <QuickLinkCard
                                href="/pods"
                                icon={Contact}
                                title="Community Pods"
                                description="See what your pods are up to."
                            />
                             <QuickLinkCard
                                href="/members"
                                icon={Users}
                                title="Find Members"
                                description="Browse the community."
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <AiSuggestions currentUser={currentUser} otherUsers={otherUsers} />
                </div>
            </div>
        </div>
    )
}

function QuickLinkCard({ href, icon: Icon, title, description }: { href: string; icon: React.ElementType; title: string; description: string; }) {
    return (
        <Link href={href} className="block group">
            <div className="p-6 rounded-lg border bg-card hover:bg-muted/50 transition-colors h-full flex flex-col justify-between">
                <div>
                    <Icon className="h-7 w-7 text-primary mb-3" />
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
}
