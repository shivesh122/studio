"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import type { User } from "@/lib/data";

type SendMessageButtonProps = {
    user: User;
}

export default function SendMessageButton({ user }: SendMessageButtonProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { toast } = useToast();

    const handleSend = () => {
        if (!message.trim()) {
            toast({
                title: "Empty Message",
                description: "You can't send an empty message.",
                variant: "destructive"
            });
            return;
        }

        // Simulate sending a message
        console.log(`Sending message to ${user.name}: ${message}`);

        toast({
            title: "Message Sent!",
            description: `Your message to ${user.name} has been sent. (This is a simulation)`,
        });

        setMessage("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><MessageSquare className="mr-2" /> Send Message</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send a message to {user.name}</DialogTitle>
                    <DialogDescription>
                        Compose your message below. This will start a new conversation that you can view on the messages page.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="message">
                            Your Message
                        </Label>
                        <Textarea 
                            id="message" 
                            placeholder={`Hi ${user.name}, I saw your profile on SkillSwap...`} 
                            className="min-h-[120px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                     <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSend}>Send Message</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
