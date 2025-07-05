"use client"

import { useState } from 'react'
import type { SuggestSkillMatchesInput, SuggestSkillMatchesOutput } from '@/ai/flows/suggest-skill-matches'
import { suggestSkillMatches } from '@/ai/flows/suggest-skill-matches'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Bot, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { User, Skill } from '@/lib/data'

type Props = {
  currentUser: User;
  otherUsers: User[];
}

const formatSkills = (skills: Skill[]) => skills.map(s => `${s.name} (${s.level})`).join(', ');

export default function AiSuggestions({ currentUser, otherUsers }: Props) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<SuggestSkillMatchesOutput | null>(null)
    const { toast } = useToast()

    const handleGenerate = async () => {
        setLoading(true)
        setResult(null)

        const userProfileString = `Name: ${currentUser.name}, Skills Offered: ${formatSkills(currentUser.skillsOffered)}, Skills Desired: ${formatSkills(currentUser.skillsDesired)}`;
        const otherUserProfilesStrings = otherUsers.map(user => `Name: ${user.name}, Skills Offered: ${formatSkills(user.skillsOffered)}, Skills Desired: ${formatSkills(user.skillsDesired)}`);

        const input: SuggestSkillMatchesInput = {
            userProfile: userProfileString,
            desiredSkills: formatSkills(currentUser.skillsDesired),
            userLocation: currentUser.location,
            otherUserProfiles: otherUserProfilesStrings
        }

        try {
            const response = await suggestSkillMatches(input);
            setResult(response);
        } catch (error) {
            console.error("Error generating suggestions:", error);
            toast({
                title: "Error",
                description: "Failed to generate suggestions. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-accent" />
                    <CardTitle>AI Match Suggestions</CardTitle>
                </div>
                <CardDescription>Let our AI find the perfect skill swaps for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {!result && !loading && (
                    <div className="text-center text-muted-foreground p-4 border-dashed border-2 rounded-lg">
                        <Sparkles className="mx-auto h-8 w-8 mb-2" />
                        <p>Click the button to get personalized match suggestions!</p>
                    </div>
                )}
                
                {loading && (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {result && (
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-2">AI Reasoning:</h4>
                            <p className="text-muted-foreground bg-secondary/50 p-3 rounded-md">{result.reasoning}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Suggested Matches:</h4>
                            <ul className="space-y-2">
                                {result.suggestedMatches.map((match, index) => (
                                    <li key={index} className="p-3 border rounded-md bg-background hover:bg-secondary/50">
                                        {match}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                 <Button onClick={handleGenerate} disabled={loading} className="w-full">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Suggestions
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
