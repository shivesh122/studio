// src/lib/data.ts

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    dataAiHint?: string;
    location: string;
    bio: string;
    skillsOffered: string[];
    skillsDesired: string[];
};

export const users: User[] = [
    {
        id: 'user-1',
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman programming',
        location: 'Greenwood',
        bio: 'Full-stack developer with a passion for creating beautiful and functional web applications. I love hiking and exploring new coffee shops.',
        skillsOffered: ['Web Development', 'Graphic Design', 'Photography'],
        skillsDesired: ['Creative Writing', 'Data Analysis', 'Public Speaking'],
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman writing',
        location: 'Greenwood',
        bio: 'Content strategist and writer, helping brands tell their story. In my free time, I write short stories and practice calligraphy.',
        skillsOffered: ['Creative Writing', 'Marketing', 'Calligraphy'],
        skillsDesired: ['Web Development', 'SEO Basics'],
    },
    {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man with charts',
        location: 'Greenwood',
        bio: 'Data analyst who loves finding patterns in numbers. I can help you make sense of your data. I also enjoy board games and cycling.',
        skillsOffered: ['Data Analysis', 'Project Management', 'Excel'],
        skillsDesired: ['Graphic Design', 'Python'],
    },
    {
        id: 'user-4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman gardening',
        location: 'Greenwood',
        bio: 'I run a small urban farm and teach yoga on the weekends. I believe in sustainable living and mindfulness.',
        skillsOffered: ['Gardening', 'Cooking', 'Yoga Instruction'],
        skillsDesired: ['Photography', 'Web Development'],
    },
    {
        id: 'user-5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man speaking',
        location: 'Greenwood',
        bio: 'Professional event planner and public speaking coach. I can help you organize your next event or nail your next presentation.',
        skillsOffered: ['Public Speaking', 'Event Planning', 'MC Services'],
        skillsDesired: ['Graphic Design', 'Social Media Marketing'],
    },
    {
        id: 'user-6',
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman sculpting',
        location: 'Greenwood',
        bio: 'Artist and sculptor with a love for ancient history. I work with clay and metal to create unique pieces.',
        skillsOffered: ['Sculpting', 'Art History', 'Pottery'],
        skillsDesired: ['Digital Marketing', 'Photography'],
    },
    {
        id: 'user-7',
        name: 'Bruce Wayne',
        email: 'bruce.wayne@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man tinkering',
        location: 'Greenwood',
        bio: 'I am an engineer and philanthropist with an interest in new technologies and home security systems.',
        skillsOffered: ['Mechanical Engineering', 'Gadget Repair', 'Home Security'],
        skillsDesired: ['Cooking', 'Meditation'],
    },
     {
        id: 'user-8',
        name: 'Clark Kent',
        email: 'clark.kent@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man writing newspaper',
        location: 'Greenwood',
        bio: 'Journalist by day, always looking for the truth. I enjoy a quiet life and helping others when I can.',
        skillsOffered: ['Journalism', 'Copywriting', 'Fact Checking'],
        skillsDesired: ['Photography', 'Public Speaking'],
    },
];

export const getCurrentUser = (): User => users[0];

export const getOtherUsers = (): User[] => users.slice(1);

export const getUserById = (id: string): User | undefined => users.find(user => user.id === id);
