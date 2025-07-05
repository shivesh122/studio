// src/lib/data.ts

export type Skill = {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Expert';
};

export type Badge = {
    id: string;
    name: string;
    description: string;
    icon: 'Star' | 'Sparkles' | 'Trophy' | 'Users' | 'Award';
};

export const allBadges: Badge[] = [
    { id: 'badge-1', name: 'First Swap', description: 'Completed your first skill exchange.', icon: 'Star' },
    { id: 'badge-2', name: 'Community Helper', description: 'Completed 5 skill exchanges.', icon: 'Sparkles' },
    { id: 'badge-3', name: 'Pod Pioneer', description: 'Joined your first Community Pod.', icon: 'Users' },
    { id: 'badge-4', name: 'Top Performer', description: 'Reached the top of a pod leaderboard.', icon: 'Trophy' },
    { id: 'badge-5', name: 'Verified Member', description: 'Verified your email, mobile, and ID.', icon: 'Award' },
];

export type Review = {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatarUrl: string;
    authorAiHint?: string;
    rating: number;
    comment: string;
    date: string;
};

export type Pod = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    dataAiHint?: string;
    members: string[]; // array of user IDs
    tags: string[];
}

export type PodEvent = {
    id: string;
    podId: string;
    title: string;
    description: string;
    date: Date;
    createdBy: string; // user id
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatarUrl: string;
    dataAiHint?: string;
    location: string;
    bio: string;
    skillsOffered: Skill[];
    skillsDesired: Skill[];
    availability: string[];
    trustScore: number;
    reviews: Review[];
    verifications: {
        email: boolean;
        mobile: boolean;
        id: boolean;
    };
    pods: string[];
    xp: number;
    level: number;
    badges: Badge[];
};

export const podEvents: PodEvent[] = [
    {
        id: 'event-1',
        podId: 'pod-1',
        title: 'Seed Swap & Planting Day',
        description: 'Bring your extra seeds and seedlings to swap with fellow gardeners! We\'ll also spend some time planting in the community garden beds.',
        date: new Date(new Date().setDate(new Date().getDate() + 7)), // A week from now
        createdBy: 'user-4',
    },
    {
        id: 'event-2',
        podId: 'pod-2',
        title: 'Component Library Show & Tell',
        description: 'Let\'s share our favorite React component libraries and discuss the pros and cons. Bring your latest project to show off!',
        date: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
        createdBy: 'user-1',
    },
    {
        id: 'event-3',
        podId: 'pod-2',
        title: 'Monthly Coding Challenge Kick-off',
        description: 'Join us as we kick off this month\'s coding challenge: building a weather app! We\'ll brainstorm ideas and form teams.',
        date: new Date(new Date().setDate(new Date().getDate() + 14)), // Two weeks from now
        createdBy: 'user-2',
    }
];

export const pods: Pod[] = [
    {
        id: 'pod-1',
        name: 'Greenwood Gardeners',
        description: 'A pod for local gardening enthusiasts to share tips, tricks, and harvests. From beginners to seasoned green thumbs, all are welcome!',
        imageUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'community garden',
        members: ['user-1', 'user-4', 'user-6'],
        tags: ['Gardening', 'Local', 'Sustainable Living']
    },
    {
        id: 'pod-2',
        name: 'Tech & Code Crew',
        description: 'Connect with fellow techies in Greenwood. Let\'s talk code, troubleshoot projects, and build cool stuff together.',
        imageUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'people coding together',
        members: ['user-1', 'user-2', 'user-3', 'user-7', 'user-8'],
        tags: ['Web Development', 'Programming', 'Tech']
    },
    {
        id: 'pod-3',
        name: 'Creative Corner',
        description: 'For artists, writers, musicians, and all creative minds. Share your work, find collaborators, and get inspired.',
        imageUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'art studio',
        members: ['user-2', 'user-5', 'user-6'],
        tags: ['Art', 'Writing', 'Music', 'Design']
    }
];

export const users: User[] = [
    {
        id: 'user-1',
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        phone: '555-0101',
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
        reviews: [
            {
                id: 'review-1',
                authorId: 'user-2',
                authorName: 'Jane Smith',
                authorAvatarUrl: 'https://placehold.co/300x300.png',
                authorAiHint: 'woman writing',
                rating: 5,
                comment: "Alex was an amazing teacher! I learned so much about web development in just a few sessions. Highly recommend!",
                date: '2 days ago'
            },
            {
                id: 'review-2',
                authorId: 'user-3',
                authorName: 'Bob Johnson',
                authorAvatarUrl: 'https://placehold.co/300x300.png',
                authorAiHint: 'man with charts',
                rating: 4.5,
                comment: "Very knowledgeable and patient. Helped me with some complex graphic design tasks. Would definitely trade skills again.",
                date: '1 week ago'
            }
        ],
        verifications: { email: true, mobile: true, id: false },
        pods: ['pod-1', 'pod-2'],
        xp: 275,
        level: 3,
        badges: [allBadges[0], allBadges[2]],
    },
    {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '555-0102',
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
        reviews: [
             {
                id: 'review-3',
                authorId: 'user-1',
                authorName: 'Alex Doe',
                authorAvatarUrl: 'https://placehold.co/300x300.png',
                authorAiHint: 'woman programming',
                rating: 4,
                comment: "Jane's writing advice was invaluable. She helped me structure my blog posts much more effectively.",
                date: '3 days ago'
            }
        ],
        verifications: { email: true, mobile: false, id: false },
        pods: ['pod-2', 'pod-3'],
        xp: 150,
        level: 2,
        badges: [allBadges[0], allBadges[2]],
    },
    {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phone: '555-0103',
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
        reviews: [],
        verifications: { email: true, mobile: true, id: false },
        pods: ['pod-2'],
        xp: 80,
        level: 1,
        badges: [allBadges[2]],
    },
    {
        id: 'user-4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        phone: '555-0104',
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
        reviews: [
            {
                id: 'review-4',
                authorId: 'user-6',
                authorName: 'Diana Prince',
                authorAvatarUrl: 'https://placehold.co/300x300.png',
                authorAiHint: 'woman sculpting',
                rating: 5,
                comment: "Alice's yoga classes are transformative. She has a wonderful energy and is a very skilled instructor.",
                date: '1 month ago'
            },
        ],
        verifications: { email: true, mobile: true, id: true },
        pods: ['pod-1'],
        xp: 320,
        level: 4,
        badges: [allBadges[0], allBadges[1], allBadges[2], allBadges[4]],
    },
    {
        id: 'user-5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        phone: '555-0105',
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
        reviews: [],
        verifications: { email: true, mobile: false, id: false },
        pods: ['pod-3'],
        xp: 50,
        level: 1,
        badges: [allBadges[2]],
    },
    {
        id: 'user-6',
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        phone: '555-0106',
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
        reviews: [],
        verifications: { email: true, mobile: true, id: true },
        pods: ['pod-1', 'pod-3'],
        xp: 410,
        level: 5,
        badges: [allBadges[0], allBadges[2], allBadges[4]],
    },
    {
        id: 'user-7',
        name: 'Bruce Wayne',
        email: 'bruce.wayne@example.com',
        phone: '555-0107',
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
        reviews: [],
        verifications: { email: true, mobile: false, id: false },
        pods: ['pod-2'],
        xp: 95,
        level: 1,
        badges: [allBadges[2]],
    },
     {
        id: 'user-8',
        name: 'Clark Kent',
        email: 'clark.kent@example.com',
        phone: '555-0108',
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
        reviews: [],
        verifications: { email: true, mobile: true, id: false },
        pods: ['pod-2'],
        xp: 110,
        level: 2,
        badges: [allBadges[2]],
    },
];

// --- DATA FUNCTIONS ---
export const getPods = (): Pod[] => pods;
export const getPodById = (id: string): Pod | undefined => pods.find(pod => pod.id === id);
export const getUsersByIds = (ids: string[]): User[] => users.filter(user => ids.includes(user.id));
export const getPodEvents = (podId: string): PodEvent[] => {
    return podEvents.filter(event => event.podId === podId).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getCurrentUser = (): User => users[0];

export const getOtherUsers = (): User[] => users.slice(1);

export const getUserById = (id: string): User | undefined => users.find(user => user.id === id);
