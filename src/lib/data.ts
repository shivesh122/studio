// src/lib/data.ts

export type Skill = {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Expert';
};

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    dataAiHint?: string;
    location: string;
    bio: string;
    skillsOffered: Skill[];
    skillsDesired: Skill[];
    availability: string[];
    trustScore: number;
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
        skillsOffered: [
            { name: 'Web Development', level: 'Expert' },
            { name: 'Graphic Design', level: 'Intermediate' },
            { name: 'Photography', level: 'Beginner' }
        ],
        skillsDesired: [
            { name: 'Creative Writing', level: 'Beginner' },
            { name: 'Data Analysis', level: 'Beginner' },
        ],
        availability: ['Weekdays', 'Evenings'],
        trustScore: 4.8,
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman writing',
        location: 'Greenwood',
        bio: 'Content strategist and writer, helping brands tell their story. In my free time, I write short stories and practice calligraphy.',
        skillsOffered: [
            { name: 'Creative Writing', level: 'Expert' },
            { name: 'Marketing', level: 'Intermediate' },
            { name: 'Calligraphy', level: 'Intermediate' }
        ],
        skillsDesired: [
            { name: 'Web Development', level: 'Beginner' },
            { name: 'SEO Basics', level: 'Beginner' },
        ],
        availability: ['Weekends'],
        trustScore: 4.5,
    },
    {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man with charts',
        location: 'Greenwood',
        bio: 'Data analyst who loves finding patterns in numbers. I can help you make sense of your data. I also enjoy board games and cycling.',
        skillsOffered: [
            { name: 'Data Analysis', level: 'Expert' },
            { name: 'Project Management', level: 'Expert' },
            { name: 'Excel', level: 'Intermediate' }
        ],
        skillsDesired: [
            { name: 'Graphic Design', level: 'Beginner' },
            { name: 'Python', level: 'Beginner' },
        ],
        availability: ['Evenings'],
        trustScore: 4.2,
    },
    {
        id: 'user-4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman gardening',
        location: 'Greenwood',
        bio: 'I run a small urban farm and teach yoga on the weekends. I believe in sustainable living and mindfulness.',
        skillsOffered: [
            { name: 'Gardening', level: 'Expert' },
            { name: 'Cooking', level: 'Intermediate' },
            { name: 'Yoga Instruction', level: 'Expert' }
        ],
        skillsDesired: [
            { name: 'Photography', level: 'Beginner' },
            { name: 'Web Development', level: 'Beginner' },
        ],
        availability: ['Weekends', 'Mornings'],
        trustScore: 4.9,
    },
    {
        id: 'user-5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man speaking',
        location: 'Greenwood',
        bio: 'Professional event planner and public speaking coach. I can help you organize your next event or nail your next presentation.',
        skillsOffered: [
            { name: 'Public Speaking', level: 'Expert' },
            { name: 'Event Planning', level: 'Expert' },
        ],
        skillsDesired: [
            { name: 'Graphic Design', level: 'Beginner' },
            { name: 'Social Media Marketing', level: 'Intermediate' },
        ],
        availability: ['Weekdays', 'Weekends'],
        trustScore: 4.0,
    },
    {
        id: 'user-6',
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'woman sculpting',
        location: 'Greenwood',
        bio: 'Artist and sculptor with a love for ancient history. I work with clay and metal to create unique pieces.',
        skillsOffered: [
            { name: 'Sculpting', level: 'Expert' },
            { name: 'Art History', level: 'Intermediate' },
            { name: 'Pottery', level: 'Expert' },
        ],
        skillsDesired: [
            { name: 'Digital Marketing', level: 'Beginner' },
            { name: 'Photography', level: 'Intermediate' },
        ],
        availability: ['Afternoons'],
        trustScore: 4.7,
    },
    {
        id: 'user-7',
        name: 'Bruce Wayne',
        email: 'bruce.wayne@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man tinkering',
        location: 'Greenwood',
        bio: 'I am an engineer and philanthropist with an interest in new technologies and home security systems.',
        skillsOffered: [
            { name: 'Mechanical Engineering', level: 'Expert' },
            { name: 'Gadget Repair', level: 'Expert' },
            { name: 'Home Security', level: 'Expert' }
        ],
        skillsDesired: [
            { name: 'Cooking', level: 'Beginner' },
            { name: 'Meditation', level: 'Beginner' },
        ],
        availability: ['Evenings'],
        trustScore: 3.8,
    },
     {
        id: 'user-8',
        name: 'Clark Kent',
        email: 'clark.kent@example.com',
        avatarUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'man writing newspaper',
        location: 'Greenwood',
        bio: 'Journalist by day, always looking for the truth. I enjoy a quiet life and helping others when I can.',
        skillsOffered: [
            { name: 'Journalism', level: 'Expert' },
            { name: 'Copywriting', level: 'Intermediate' },
            { name: 'Fact Checking', level: 'Expert' }
        ],
        skillsDesired: [
            { name: 'Photography', level: 'Beginner' },
            { name: 'Public Speaking', level: 'Intermediate' },
        ],
        availability: ['Mornings', 'Evenings'],
        trustScore: 4.9,
    },
];

export const getCurrentUser = (): User => users[0];

export const getOtherUsers = (): User[] => users.slice(1);

export const getUserById = (id: string): User | undefined => users.find(user => user.id === id);
