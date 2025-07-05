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
 *   SuggestSkillMatchesInput: The new input type for the suggestSkillMatches function.
 *   SuggestSkillMatchesOutput: The new return type for the suggestSkillMatches function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define schemas for structured data
const SkillSchema = z.object({
  name: z.string(),
  level: z.enum(['Beginner', 'Intermediate', 'Expert']),
});

const UserProfileSchema = z.object({
  name: z.string(),
  location: z.string(),
  availability: z.array(z.string()),
  trustScore: z.number(),
  skillsOffered: z.array(SkillSchema),
  skillsDesired: z.array(SkillSchema),
});


// Define the input schema for the flow
const SuggestSkillMatchesInputSchema = z.object({
  currentUser: UserProfileSchema,
  otherUsers: z.array(UserProfileSchema),
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
  prompt: `You are an expert matchmaking algorithm for a skill-swapping platform.
Your goal is to find the best possible matches for the current user based on a variety of factors.

Here is the current user's profile:
- Name: {{{currentUser.name}}}
- Location: {{{currentUser.location}}}
- Availability: {{#each currentUser.availability}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Trust Score: {{{currentUser.trustScore}}}
- Skills they offer: {{#each currentUser.skillsOffered}}'{{this.name}} ({{this.level}})'{{#unless @last}}, {{/unless}}{{/each}}
- Skills they want: {{#each currentUser.skillsDesired}}'{{this.name}} ({{this.level}})'{{#unless @last}}, {{/unless}}{{/each}}

Here are other users on the platform:
{{#each otherUsers}}
---
- Name: {{{this.name}}}
- Location: {{{this.location}}}
- Availability: {{#each this.availability}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Trust Score: {{{this.trustScore}}}
- Skills they offer: {{#each this.skillsOffered}}'{{this.name}} ({{this.level}})'{{#unless @last}}, {{/unless}}{{/each}}
- Skills they want: {{#each this.skillsDesired}}'{{this.name}} ({{this.level}})'{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Analyze the profiles to find complementary matches. A good match is someone who offers a skill the current user wants, AND wants a skill the current user offers.

Prioritize matches based on the following criteria, in order of importance:
1.  **Complementary Skills**: This is the most important factor. There must be a clear skill exchange.
2.  **Proximity**: Users in the same location are strongly preferred.
3.  **Trust Score**: Higher trust scores are better. A significantly higher trust score can make a user a more attractive match.
4.  **Availability**: Users with overlapping availability are better matches.

Based on your analysis, provide a ranked list of the top 3-5 suggested user profiles that would be the best match for the current user. For each suggestion, provide a brief reasoning that explains *why* they are a good match, referencing the criteria above.

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
