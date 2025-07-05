// src/lib/data.ts

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    dataAiHint?: string;
    location: string;
    skillsOffered: string[];
    skillsDesired: string[];
};

export const users: User[] = [
    {
        id: 'user-1',
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        avatarUrl: 'https://placehold.co/100x100.png',
        dataAiHint: 'person portrait',
        location: 'Greenwood',
        skillsOffered: ['Web Development', 'Graphic Design', 'Photography'],
        skillsDesired: ['Creative Writing', 'Data Analysis', 'Public Speaking'],
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: 'https://placehold.co/100x100.png',
        dataAiHint: 'person portrait',
        location: 'Greenwood',
        skillsOffered: ['Creative Writing', 'Marketing'],
        skillsDesired: ['Web Development'],
    },
    {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        avatarUrl: 'https://placehold.co/100x100.png',
        dataAiHint: 'person portrait',
        location: 'Greenwood',
        skillsOffered: ['Data Analysis', 'Project Management'],
        skillsDesired: ['Graphic Design'],
    },
    {
        id: 'user-4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        avatarUrl: 'https://placehold.co/100x100.png',
        dataAiHint: 'person portrait',
        location: 'Greenwood',
        skillsOffered: ['Gardening', 'Cooking', 'Yoga Instruction'],
        skillsDesired: ['Photography', 'Web Development'],
    },
    {
        id: 'user-5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        avatarUrl: 'https://placehold.co/100x100.png',
        dataAiHint: 'person portrait',
        location: 'Greenwood',
        skillsOffered: ['Public Speaking', 'Event Planning'],
        skillsDesired: ['Graphic Design'],
    },
];

export const getCurrentUser = (): User => users[0];

export const getOtherUsers = (): User[] => users.slice(1);
