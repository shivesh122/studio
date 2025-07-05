'use client'

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from "@/lib/data";
import { Save, PlusCircle, X, Camera, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';

const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'] as const;
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Expert'] as const;

const skillSchema = z.object({
  name: z.string().min(1, "Skill name cannot be empty."),
  level: z.enum(SKILL_LEVELS),
});

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  location: z.string().min(2, { message: "Location is required." }),
  bio: z.string().max(300, { message: "Bio cannot be more than 300 characters." }).optional(),
  availability: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one availability option.",
  }),
  skillsOffered: z.array(skillSchema).max(10, "You can add a maximum of 10 skills."),
  skillsDesired: z.array(skillSchema).max(10, "You can add a maximum of 10 skills."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
    const user = getCurrentUser();
    const { toast } = useToast();

    // State for image previews
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    // Refs for file inputs
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    // Load images from localStorage on mount
    useEffect(() => {
        const savedAvatar = localStorage.getItem('user_avatar_url');
        const savedBanner = localStorage.getItem('user_banner_url');
        if (savedAvatar) {
            setAvatarPreview(savedAvatar);
        }
        if (savedBanner) {
            setBannerPreview(savedBanner);
        }
    }, []);


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            location: user.location,
            bio: user.bio,
            availability: user.availability,
            skillsOffered: user.skillsOffered,
            skillsDesired: user.skillsDesired,
        },
    });

    const { fields: offeredFields, append: appendOffered, remove: removeOffered } = useFieldArray({
        control: form.control,
        name: "skillsOffered"
    });

    const { fields: desiredFields, append: appendDesired, remove: removeDesired } = useFieldArray({
        control: form.control,
        name: "skillsDesired"
    });


    function onSubmit(data: ProfileFormValues) {
        // In a real application, you would send this data to your backend to update the user's profile.
        // For this prototype, we'll save the image URLs to localStorage for persistence.
        if (avatarPreview) {
            localStorage.setItem('user_avatar_url', avatarPreview);
        }
        if (bannerPreview) {
            localStorage.setItem('user_banner_url', bannerPreview);
        }

        // Manually trigger a storage event to update other tabs/components
        window.dispatchEvent(new Event('storage'));

        console.log("Profile updated:", {
            ...data,
            avatarUrl: avatarPreview || user.avatarUrl,
            bannerUrl: bannerPreview || "https://placehold.co/1200x400.png"
        });
        toast({
            title: "Profile Saved!",
            description: "Your changes have been successfully saved.",
        });
    }

    // Handler for image selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setImagePreview: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="overflow-hidden">
                    <div className="relative h-48 w-full bg-muted group">
                        <Image 
                            src={bannerPreview || "https://placehold.co/1200x400.png"} 
                            alt="Profile banner" 
                            fill 
                            style={{objectFit: "cover"}} 
                            data-ai-hint="abstract texture"
                            key={bannerPreview}
                        />
                         <input
                            type="file"
                            ref={bannerInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setBannerPreview)}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => bannerInputRef.current?.click()}
                        >
                            <Camera className="h-5 w-5" />
                            <span className="sr-only">Change banner image</span>
                        </Button>
                    </div>
                    <CardContent className="relative flex flex-col md:flex-row gap-6 p-6">
                        <div className="-mt-20 md:-mt-24 relative group">
                            <Avatar className="h-32 w-32 border-4 border-background">
                                <AvatarImage 
                                    src={avatarPreview || user.avatarUrl} 
                                    alt={user.name} 
                                    data-ai-hint={user.dataAiHint}
                                    key={avatarPreview}
                                />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <input
                                type="file"
                                ref={avatarInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, setAvatarPreview)}
                            />
                             <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                onClick={() => avatarInputRef.current?.click()}
                            >
                                <Camera className="h-6 w-6" />
                                <span className="sr-only">Change avatar</span>
                            </Button>
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
                                                <Input placeholder="Your Email" type="email" {...field} className="h-auto p-0 border-0 bg-transparent" readOnly />
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

                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills I Offer</CardTitle>
                            <CardDescription>Manage the skills you can share.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {offeredFields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 p-2 border rounded-md bg-secondary/30">
                                        <FormField
                                            control={form.control}
                                            name={`skillsOffered.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem className="flex-grow w-full">
                                                    <FormLabel className={cn(index !== 0 && "sm:sr-only")}>Skill Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Graphic Design" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`skillsOffered.${index}.level`}
                                            render={({ field }) => (
                                                <FormItem className="w-full sm:w-[150px]">
                                                    <FormLabel className={cn(index !== 0 && "sm:sr-only")}>Level</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select level" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {SKILL_LEVELS.map(level => (
                                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive self-end"
                                            onClick={() => removeOffered(index)}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Remove skill</span>
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => appendOffered({ name: '', level: 'Beginner' })}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Skill
                                </Button>
                                <FormMessage>{form.formState.errors.skillsOffered?.message}</FormMessage>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills I Want</CardTitle>
                            <CardDescription>Manage skills you want to learn.</CardDescription>
                        </CardHeader>
                       <CardContent>
                            <div className="space-y-4">
                                {desiredFields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 p-2 border rounded-md bg-secondary/30">
                                        <FormField
                                            control={form.control}
                                            name={`skillsDesired.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem className="flex-grow w-full">
                                                    <FormLabel className={cn(index !== 0 && "sm:sr-only")}>Skill Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Creative Writing" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`skillsDesired.${index}.level`}
                                            render={({ field }) => (
                                                <FormItem className="w-full sm:w-[150px]">
                                                    <FormLabel className={cn(index !== 0 && "sm:sr-only")}>Level</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select level" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {SKILL_LEVELS.map(level => (
                                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive self-end"
                                            onClick={() => removeDesired(index)}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Remove skill</span>
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => appendDesired({ name: '', level: 'Beginner' })}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Skill
                                </Button>
                                <FormMessage>{form.formState.errors.skillsDesired?.message}</FormMessage>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="lg:col-span-2 xl:col-span-1">
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
                    <Card className="lg:col-span-2 xl:col-span-3">
                        <CardHeader>
                            <CardTitle>Account Verification</CardTitle>
                            <CardDescription>Enhance your trust score by verifying your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium text-sm">Email</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                {user.verifications.email ? (
                                    <div className="flex items-center gap-2 text-primary text-sm">
                                        <ShieldCheck className="h-5 w-5" />
                                        <span>Verified</span>
                                    </div>
                                ) : (
                                    <Button type="button" variant="outline" size="sm">Verify</Button>
                                )}
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium text-sm">Phone Number</p>
                                    <p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p>
                                </div>
                                {user.verifications.mobile ? (
                                    <div className="flex items-center gap-2 text-primary text-sm">
                                        <ShieldCheck className="h-5 w-5" />
                                        <span>Verified</span>
                                    </div>
                                ) : (
                                    <Button type="button" variant="outline" size="sm">Verify</Button>
                                )}
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="font-medium text-sm">Identity (ID)</p>
                                    <p className="text-sm text-muted-foreground">Upload a government-issued ID.</p>
                                </div>
                                {user.verifications.id ? (
                                    <div className="flex items-center gap-2 text-primary text-sm">
                                        <ShieldCheck className="h-5 w-5" />
                                        <span>Verified</span>
                                    </div>
                                ) : (
                                    <Button type="button" variant="outline" size="sm">Upload ID</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    )
}
