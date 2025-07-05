
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCurrentUser, getUserById, type User } from '@/lib/data';
import { getMessagesForUser, type Message, addMessage } from '@/lib/messages';
import { SendHorizonal, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function MessagesPage() {
    const currentUser = useMemo(() => getCurrentUser(), []);
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messageContent, setMessageContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setAllMessages(getMessagesForUser(currentUser.id));
    }, [currentUser.id]);

    const conversations = useMemo(() => {
        const convos: { [key: string]: { user: User; messages: Message[]; lastMessage: Message } } = {};

        allMessages.forEach(message => {
            const otherUserId = message.senderId === currentUser.id ? message.recipientId : message.senderId;
            const otherUser = getUserById(otherUserId);
            
            if (otherUser) {
                if (!convos[otherUserId]) {
                    convos[otherUserId] = {
                        user: otherUser,
                        messages: [],
                        lastMessage: message,
                    };
                }
                convos[otherUserId].messages.push(message);
                if (message.timestamp > convos[otherUserId].lastMessage.timestamp) {
                    convos[otherUserId].lastMessage = message;
                }
            }
        });

        Object.values(convos).forEach(convo => {
            convo.messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        });

        return Object.values(convos).sort((a, b) => b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime());
    }, [allMessages, currentUser.id]);

    useEffect(() => {
        if (!selectedUserId && conversations.length > 0) {
            setSelectedUserId(conversations[0].user.id);
        }
    }, [conversations, selectedUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages, selectedUserId]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageContent.trim() || !selectedUserId) return;

        addMessage(currentUser.id, selectedUserId, messageContent);
        setAllMessages(getMessagesForUser(currentUser.id));
        setMessageContent('');
    };

    const selectedConversation = conversations.find(c => c.user.id === selectedUserId);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-foreground/90">Messages</h1>
                <p className="text-muted-foreground mt-1">Your conversations with other members.</p>
            </div>
            <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-220px)]">
                <div className="md:col-span-1 lg:col-span-1 border-r">
                    <CardHeader className='p-4'>
                         <CardTitle className="text-xl">Conversations</CardTitle>
                    </CardHeader>
                    <ScrollArea className="h-[calc(100%-80px)]">
                         <div className="p-2 space-y-1">
                            {conversations.map(({ user, lastMessage }) => (
                                <Button
                                    key={user.id}
                                    variant="ghost"
                                    onClick={() => setSelectedUserId(user.id)}
                                    className={cn(
                                        "w-full justify-start h-auto p-3 text-left",
                                        selectedUserId === user.id && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className='flex-1 truncate'>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{lastMessage.content}</p>
                                    </div>
                                    <time className="text-xs text-muted-foreground self-start ml-2">
                                        {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
                                    </time>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            <div className="flex items-center gap-3 p-3 border-b">
                                <Avatar>
                                    <AvatarImage src={selectedConversation.user.avatarUrl} alt={selectedConversation.user.name} data-ai-hint={selectedConversation.user.dataAiHint}/>
                                    <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold text-lg">{selectedConversation.user.name}</h3>
                            </div>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {selectedConversation.messages.map(message => (
                                        <div key={message.id} className={cn(
                                            "flex items-end gap-2",
                                            message.senderId === currentUser.id ? "justify-end" : "justify-start"
                                        )}>
                                            {message.senderId !== currentUser.id && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={selectedConversation.user.avatarUrl} alt={selectedConversation.user.name} data-ai-hint={selectedConversation.user.dataAiHint}/>
                                                    <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn(
                                                "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg",
                                                message.senderId === currentUser.id 
                                                    ? "bg-primary text-primary-foreground" 
                                                    : "bg-secondary"
                                            )}>
                                                <p className="text-sm">{message.content}</p>
                                                <p className={cn(
                                                    "text-xs mt-1 opacity-70",
                                                    message.senderId === currentUser.id ? "text-right" : "text-left"
                                                    )}>
                                                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t">
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                    <Input 
                                        value={messageContent}
                                        onChange={(e) => setMessageContent(e.target.value)}
                                        placeholder="Type your message..." 
                                        autoComplete="off"
                                    />
                                    <Button type="submit" size="icon" disabled={!messageContent.trim()}>
                                        <SendHorizonal className="h-5 w-5" />
                                        <span className="sr-only">Send Message</span>
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-12 h-full">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-semibold">Select a conversation</h2>
                            <p className="text-muted-foreground">Choose a person from the left to view messages.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
