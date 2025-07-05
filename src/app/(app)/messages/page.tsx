
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCurrentUser, getUserById, type User } from '@/lib/data';
import { getMessagesForUser, type Message, addMessage } from '@/lib/messages';
import { SendHorizonal, MessageSquare, CalendarPlus, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProposalCard from '@/components/proposal-card';


export default function MessagesPage() {
    const currentUser = useMemo(() => getCurrentUser(), []);
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messageContent, setMessageContent] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // State for proposal dialog
    const [proposalOpen, setProposalOpen] = useState(false);
    const [proposalDate, setProposalDate] = useState<Date | undefined>(new Date());
    const [proposalTime, setProposalTime] = useState<string>('Afternoon');

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
        // On desktop, select the first conversation by default
        if (!selectedUserId && conversations.length > 0 && window.innerWidth >= 768) {
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
    
    const handleSendProposal = () => {
        if (!proposalDate || !proposalTime || !selectedUserId) return;

        const formattedDate = format(proposalDate, 'yyyy-MM-dd');
        const proposalContent = `[PROPOSAL] Date: ${formattedDate}, Time: ${proposalTime}`;
        
        addMessage(currentUser.id, selectedUserId, proposalContent);
        setAllMessages(getMessagesForUser(currentUser.id));
        
        setProposalOpen(false); // Close dialog
    };
    
    const handleProposalResponse = (responseText: string) => {
        if (!selectedUserId) return;
        addMessage(currentUser.id, selectedUserId, responseText);
        setAllMessages(getMessagesForUser(currentUser.id));
    }


    const selectedConversation = conversations.find(c => c.user.id === selectedUserId);

    const renderMessageContent = (message: Message) => {
        // Don't show proposal card if the current user sent it, show a simple note instead.
        if (message.content.startsWith('[PROPOSAL]')) {
            if (message.senderId === currentUser.id) {
                return (
                    <div className="p-3">
                         <p className="text-sm italic">You sent a session proposal.</p>
                    </div>
                );
            }
            return (
                <ProposalCard 
                    content={message.content} 
                    onRespond={handleProposalResponse}
                />
            );
        }
    
        if (message.content.startsWith('[ACCEPTED]') || message.content.startsWith('[DECLINED]')) {
            const isAccepted = message.content.startsWith('[ACCEPTED]');
            const notificationText = message.content.substring(message.content.indexOf(']') + 2);
            return (
                <div className={cn(
                    "flex items-center gap-2 p-3 rounded-md text-sm",
                    isAccepted ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                )}>
                    {isAccepted ? <CheckCircle2 className="h-5 w-5"/> : <XCircle className="h-5 w-5"/>}
                    <p>{notificationText}</p>
                </div>
            )
        }
        
        // Default message content
        return (
            <div className="p-3">
                <p className="text-sm">{message.content}</p>
                <p className={cn(
                    "text-xs mt-1 opacity-70",
                    message.senderId === currentUser.id ? "text-right" : "text-left"
                    )}>
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </p>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-foreground/90">Messages</h1>
                <p className="text-muted-foreground mt-1">Your conversations with other members.</p>
            </div>
            <Card className="h-[calc(100vh-220px)] overflow-hidden">
                <div className="md:grid md:grid-cols-3 lg:grid-cols-4 h-full">
                    {/* CONVERSATION LIST */}
                    <div className={cn('h-full flex-col border-r md:col-span-1 lg:col-span-1', selectedUserId ? 'hidden md:flex' : 'flex')}>
                        <CardHeader className='p-4'>
                             <CardTitle className="text-xl">Conversations</CardTitle>
                        </CardHeader>
                        <ScrollArea className="h-full">
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

                    {/* CHAT PANE */}
                    <div className={cn('h-full flex-col md:col-span-2 lg:col-span-3', selectedUserId ? 'flex' : 'hidden md:flex')}>
                        {selectedConversation ? (
                            <>
                                <div className="flex items-center gap-3 p-3 border-b shrink-0">
                                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedUserId(null)}>
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="sr-only">Back to conversations</span>
                                    </Button>
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
                                                    "max-w-xs md:max-w-md lg:max-w-lg rounded-lg",
                                                    message.senderId === currentUser.id 
                                                        ? "bg-primary text-primary-foreground" 
                                                        : "bg-secondary",
                                                    // Remove padding/bg for special cards, they have their own.
                                                    message.content.startsWith('[') && "bg-transparent p-0 text-foreground"
                                                )}>
                                                    {renderMessageContent(message)}
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t shrink-0">
                                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                        <Input 
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder="Type your message..." 
                                            autoComplete="off"
                                        />
                                        <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button" variant="ghost" size="icon" title="Propose a session time">
                                                    <CalendarPlus className="h-5 w-5" />
                                                    <span className="sr-only">Propose a session</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Propose a Session Time</DialogTitle>
                                                    <DialogDescription>
                                                        Select a date and time to propose to {selectedConversation.user.name}.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Calendar
                                                        mode="single"
                                                        selected={proposalDate}
                                                        onSelect={setProposalDate}
                                                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                                        className="rounded-md border self-center"
                                                    />
                                                    <RadioGroup value={proposalTime} onValueChange={setProposalTime} className="grid grid-cols-3 gap-2">
                                                        <div>
                                                            <RadioGroupItem value="Mornings" id="mornings" className="peer sr-only" />
                                                            <Label htmlFor="mornings" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Mornings</Label>
                                                        </div>
                                                        <div>
                                                            <RadioGroupItem value="Afternoons" id="afternoons" className="peer sr-only" />
                                                            <Label htmlFor="afternoons" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Afternoons</Label>
                                                        </div>
                                                        <div>
                                                            <RadioGroupItem value="Evenings" id="evenings" className="peer sr-only" />
                                                            <Label htmlFor="evenings" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Evenings</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleSendProposal} disabled={!proposalDate}>Send Proposal</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

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
                </div>
            </Card>
        </div>
    );
}
