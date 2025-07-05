'use server';

import { z } from 'zod';
import { addMessage } from './messages';
import { getCurrentUser } from './data';
import { revalidatePath } from 'next/cache';

const sendMessageSchema = z.object({
    recipientId: z.string(),
    message: z.string().min(1, { message: "Message cannot be empty." }),
});

type FormState = {
    errors?: {
        recipientId?: string[];
        message?: string[];
    };
    message?: string;
    success?: boolean;
}

export async function sendMessage(prevState: FormState, formData: FormData): Promise<FormState> {
    const currentUser = getCurrentUser();

    const validatedFields = sendMessageSchema.safeParse({
        recipientId: formData.get('recipientId'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed.",
            success: false,
        };
    }

    try {
        addMessage(
            currentUser.id,
            validatedFields.data.recipientId,
            validatedFields.data.message
        );
        
        // This is useful if we have a messages page that needs to be updated.
        revalidatePath('/messages');

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, message: "An unexpected error occurred. Failed to send message." };
    }
}
