
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Gem } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const plans = {
    monthly: [
        {
            name: 'Free',
            price: '$0',
            description: 'For individuals starting out.',
            features: ['Basic search filters', '1 Community Pod', '5 new connections per day'],
            isCurrent: true,
        },
        {
            name: 'Pro',
            price: '$15',
            priceSuffix: '/ month',
            description: 'For power users and professionals.',
            features: [
                'Advanced search filters',
                'Unlimited Community Pods',
                'Unlimited connections',
                'Boosted profile visibility',
                'Skill certifications',
            ],
            isCurrent: false,
            isFeatured: true,
        },
        {
            name: 'Enterprise',
            price: 'Contact Us',
            description: 'For organizations and teams.',
            features: [
                'All Pro features',
                'Admin dashboard',
                'Team analytics & skill insights',
                'Priority support',
            ],
            isCurrent: false,
        },
    ],
    yearly: [
        {
            name: 'Free',
            price: '$0',
            description: 'For individuals starting out.',
            features: ['Basic search filters', '1 Community Pod', '5 new connections per day'],
            isCurrent: true,
        },
        {
            name: 'Pro',
            price: '$144',
            priceSuffix: '/ year',
            description: 'For power users and professionals.',
            features: [
                'Advanced search filters',
                'Unlimited Community Pods',
                'Unlimited connections',
                'Boosted profile visibility',
                'Skill certifications',
            ],
            isCurrent: false,
            isFeatured: true,
        },
        {
            name: 'Enterprise',
            price: 'Contact Us',
            description: 'For organizations and teams.',
            features: [
                'All Pro features',
                'Admin dashboard',
                'Team analytics & skill insights',
                'Priority support',
            ],
            isCurrent: false,
        },
    ]
};


export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const currentPlans = plans[billingCycle];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
                    <Gem className="text-primary"/>
                    Subscription Plans
                </h1>
                <p className="text-muted-foreground mt-1">Choose the plan that's right for you and unlock powerful features.</p>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch 
                    id="billing-cycle"
                    checked={billingCycle === 'yearly'}
                    onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                />
                <Label htmlFor="billing-cycle">Yearly</Label>
                 <span className="text-sm font-medium text-primary">(Save 20%)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
                {currentPlans.map((plan, index) => (
                    <Card 
                        key={index} 
                        className={cn(
                            "flex flex-col",
                            plan.isFeatured && "border-primary border-2 shadow-lg md:scale-105"
                        )}
                    >
                        <CardHeader className="text-center pt-8 px-4 sm:px-6">
                            {plan.isFeatured && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                                        <Gem className="h-4 w-4" />
                                        Most Popular
                                    </div>
                                </div>
                            )}
                            <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow px-4 sm:px-6">
                             <div className="text-center mb-6">
                                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                                {plan.priceSuffix && <span className="text-muted-foreground">{plan.priceSuffix}</span>}
                            </div>
                            <ul className="space-y-3 flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="p-4 sm:p-6 mt-4">
                            <Button 
                                className="w-full"
                                variant={plan.isFeatured ? 'default' : 'outline'}
                                disabled={plan.isCurrent}
                            >
                                {plan.isCurrent ? "Current Plan" : (plan.price === 'Contact Us' ? 'Contact Us' : 'Upgrade')}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
