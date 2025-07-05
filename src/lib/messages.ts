

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
};

// In-memory store for messages. In a real app, you'd use a database like Firestore.
export const messages: Message[] = [
    {
        id: 'msg-1',
        senderId: 'user-2', // Jane
        recipientId: 'user-1', // Alex (current user)
        content: "Hey Alex! I saw you're offering web development skills. I'd love to learn some basics. Maybe we can swap for some creative writing help?",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
        id: 'msg-2',
        senderId: 'user-1', // Alex
        recipientId: 'user-2', // Jane
        content: "Hi Jane! Absolutely, that sounds like a great idea. I've been wanting to improve my writing. When are you free to chat?",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
        id: 'msg-3',
        senderId: 'user-3', // Bob
        recipientId: 'user-1', // Alex
        content: "I need some help with a graphic design for a presentation. Can you help?",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 30), // 30 mins ago
    },
    {
        id: 'msg-4',
        senderId: 'user-1', // Alex
        recipientId: 'user-3', // Bob
        content: "Hey Bob, sure thing. I can help with that. Send me the details.",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 28), // 28 mins ago
    }
];

export const addMessage = (senderId: string, recipientId: string, content: string): Message => {
  const newMessage: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    senderId,
    recipientId,
    content,
    timestamp: new Date(),
  };
  messages.push(newMessage);
  // This log will appear in your server console (terminal)
  console.log('New message added:', newMessage);
  return newMessage;
};

export const getMessagesForUser = (userId: string): Message[] => {
    return messages.filter(m => m.recipientId === userId || m.senderId === userId)
                     .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
