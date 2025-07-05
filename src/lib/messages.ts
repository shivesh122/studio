'use server';

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
};

// In-memory store for messages. In a real app, you'd use a database like Firestore.
export const messages: Message[] = [];

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
