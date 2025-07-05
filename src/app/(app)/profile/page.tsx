'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from "@/lib/data";
import { Save } from "lucide-react";
import Image from "next/image";

const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'] as const;

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  location: z.string().min(2, { message: "Location is required." }),
  bio: z.string().max(300, { message: "Bio cannot be more than 300 characters." }).optional(),
  availability: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one availability option.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
    const user = getCurrentUser();
    const { toast } = useToast();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            location: user.location,
            bio: user.bio,
            availability: user.availability,
        },
    });

    function onSubmit(data: ProfileFormValues) {
        // In a real application, you would send this data to your backend to update the user's profile.
        // For now, we'll just log it and show a success toast.
        console.log("Profile updated:", data);
        toast({
            title: "Profile Saved!",
            description: "Your changes have been successfully saved.",
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="overflow-hidden">
                    <div className="relative h-48 w-full bg-muted">
                        <Image src="https://placehold.co/1200x400.png" alt="Profile banner" fill style={{objectFit: "cover"}} data-ai-hint="abstract texture" />
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
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} className="text-2xl font-bold font-headline h-auto p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                            </div>
                           
                            <div className="grid md:grid-cols-2 gap-x-4 text-muted-foreground mt-2">
                                 <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Your Location" {...field} className="h-auto p-0 border-0 bg-transparent" />
                                            </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Your Email" type="email" {...field} className="h-auto p-0 border-0 bg-transparent" />
                                            </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormControl>
                                            <Textarea placeholder="Tell us a little about yourself" {...field} className="text-sm text-foreground/80" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills I Offer</CardTitle>
                            <CardDescription>These are the skills I can share.</CardDescription>
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
                            <CardTitle>Skills I Want</CardTitle>
                            <CardDescription>These are skills I want to learn.</CardDescription>
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
                            <CardTitle>My Availability</CardTitle>
                            <CardDescription>When are you generally free to connect?</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <FormField
                                control={form.control}
                                name="availability"
                                render={() => (
                                    <FormItem className="space-y-3">
                                        {AVAILABILITY_OPTIONS.map((item) => (
                                            <FormField
                                            key={item}
                                            control={form.control}
                                            name="availability"
                                            render={({ field }) => {
                                                return (
                                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                (value) => value !== item
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-sm">
                                                        {item}
                                                    </FormLabel>
                                                </FormItem>
                                                )
                                            }}
                                            />
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    )
}
