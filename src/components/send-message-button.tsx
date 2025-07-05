"use client"

import { useEffect, useState, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Loader2 } from "lucide-react";
import type { User } from "@/lib/data";
import { sendMessage } from "@/lib/actions";

const initialState = {
    message: "",
    errors: {},
    success: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
            ) : (
                "Send Message"
            )}
        </Button>
    );
}

export default function SendMessageButton({ user }: { user: User }) {
    const [state, dispatch] = useActionState(sendMessage, initialState);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Message Sent!",
                description: `Your message to ${user.name} has been sent.`,
            });
            setOpen(false);
        } else if (state.message && !state.success && Object.keys(state.errors ?? {}).length === 0) {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast, user.name]);

    // When dialog closes, reset the form. This doesn't reset the `state` from useActionState.
    // That will reset on the next successful submission.
    useEffect(() => {
        if (!open) {
            formRef.current?.reset();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><MessageSquare className="mr-2 h-4 w-4" /> Send Message</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={dispatch} ref={formRef}>
                    <DialogHeader>
                        <DialogTitle>Send a message to {user.name}</DialogTitle>
                        <DialogDescription>
                            Compose your message below. This will start a new conversation that you can view on the messages page.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <input type="hidden" name="recipientId" value={user.id} />
                        <div className="grid gap-2">
                            <Label htmlFor="message">
                                Your Message
                            </Label>
                            <Textarea 
                                id="message"
                                name="message" 
                                placeholder={`Hi ${user.name}, I saw your profile on SkillSwap...`} 
                                className="min-h-[120px]"
                                required
                            />
                            {state.errors?.message && (
                                <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button variant="ghost" type="button">Cancel</Button>
                         </DialogClose>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
