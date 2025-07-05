// src/ai/flows/suggest-skill-matches.ts
'use server';

/**
 * @fileOverview AI-powered skill match suggestions.
 *
 * This file defines a Genkit flow that leverages AI to suggest potential skill exchange matches
 * based on a user's profile and desired skills. It uses a prompt to analyze user profiles
 * and identify suitable matches.
 *
 * @exports {
 *   suggestSkillMatches: (input: SuggestSkillMatchesInput) => Promise<SuggestSkillMatchesOutput>;
 *   SuggestSkillMatchesInput: The input type for the suggestSkillMatches function.
 *   SuggestSkillMatchesOutput: The return type for the suggestSkillMatches function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const SuggestSkillMatchesInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile including skills offered and desired.'),
  desiredSkills: z.string().describe('The skills the user is looking to acquire.'),
  userLocation: z.string().describe('The location of the user.'),
  otherUserProfiles: z
    .array(z.string())
    .describe('A list of other user profiles in the same location.'),
});
export type SuggestSkillMatchesInput = z.infer<typeof SuggestSkillMatchesInputSchema>;

// Define the output schema for the flow
const SuggestSkillMatchesOutputSchema = z.object({
  suggestedMatches: z
    .array(z.string())
    .describe('A list of suggested user profiles that match the user needs.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested matches.'),
});
export type SuggestSkillMatchesOutput = z.infer<typeof SuggestSkillMatchesOutputSchema>;

// Wrapper function
export async function suggestSkillMatches(input: SuggestSkillMatchesInput): Promise<SuggestSkillMatchesOutput> {
  return suggestSkillMatchesFlow(input);
}

// Define the prompt
const suggestSkillMatchesPrompt = ai.definePrompt({
  name: 'suggestSkillMatchesPrompt',
  input: {schema: SuggestSkillMatchesInputSchema},
  output: {schema: SuggestSkillMatchesOutputSchema},
  prompt: `You are an expert at suggesting skill exchange matches between users.

  Based on the user's profile, desired skills, and location, analyze other user profiles
  in the same location and suggest potential matches.

  User Profile: {{{userProfile}}}
  Desired Skills: {{{desiredSkills}}}
  User Location: {{{userLocation}}}
  Other User Profiles: {{#each otherUserProfiles}}{{{this}}}\n{{/each}}

  Consider the skills offered and desired by each user, as well as their location.
  Provide a list of suggested user profiles that would be a good match for the user.
  Also, explain your reasoning behind the suggested matches.
  Return your answer as a JSON object.
  `,
});

// Define the flow
const suggestSkillMatchesFlow = ai.defineFlow(
  {
    name: 'suggestSkillMatchesFlow',
    inputSchema: SuggestSkillMatchesInputSchema,
    outputSchema: SuggestSkillMatchesOutputSchema,
  },
  async input => {
    const {output} = await suggestSkillMatchesPrompt(input);
    return output!;
  }
);
