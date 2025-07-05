
'use client'

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCurrentUser, getPods, type Pod } from '@/lib/data';
import { Contact, PlusCircle } from 'lucide-react';
import PodCard from '@/components/pod-card';


export default function PodsPage() {
    const currentUser = useMemo(() => getCurrentUser(), []);
    const allPods = useMemo(() => getPods(), []);

    const myPods = useMemo(() => {
        return allPods.filter(pod => currentUser.pods.includes(pod.id));
    }, [allPods, currentUser]);

    const discoverPods = useMemo(() => {
        return allPods.filter(pod => !currentUser.pods.includes(pod.id));
    }, [allPods, currentUser]);

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
                        <Contact className="text-primary"/>
                        Community Pods
                    </h1>
                    <p className="text-muted-foreground mt-1">Join micro-communities based on location or interests.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Pod
                </Button>
            </div>
            
            {myPods.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-headline">My Pods</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {myPods.map(pod => (
                            <PodCard key={pod.id} pod={pod} />
                        ))}
                    </div>
                </section>
            )}

            <section className="space-y-4">
                <h2 className="text-2xl font-bold font-headline">Discover Pods</h2>
                 {discoverPods.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {discoverPods.map(pod => (
                            <PodCard key={pod.id} pod={pod} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center text-muted-foreground">
                            <p>You've joined all the available pods!</p>
                        </CardContent>
                    </Card>
                )}
            </section>
        </div>
    )
}
