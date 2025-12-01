'use server'

import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function linkElder(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { error: 'Please enter an email address' };
    }

    try {
        // 1. Find the Elder user by email
        const elderUser = await prisma.user.findUnique({
            where: { email },
            include: { elderProfile: true }
        });

        if (!elderUser) {
            return { error: 'User not found with this email' };
        }

        if (elderUser.role !== 'Elder') {
            return { error: 'This user is not registered as an Elder' };
        }

        if (!elderUser.elderProfile) {
            return { error: 'This elder profile is incomplete' };
        }

        // 2. Get the current logged-in user
        const cookieStore = await cookies();
        const currentUserId = cookieStore.get('userId')?.value;

        if (!currentUserId) {
            return { error: 'You must be logged in' };
        }

        const currentUser = await prisma.user.findUnique({
            where: { id: currentUserId }
        });

        if (!currentUser) {
            return { error: 'Current user not found' };
        }

        // 3. Update linkedElderIds
        let currentLinkedIds: string[] = [];
        try {
            currentLinkedIds = JSON.parse(currentUser.linkedElderIds || '[]');
        } catch (e) {
            currentLinkedIds = [];
        }

        // Check if already linked
        if (currentLinkedIds.includes(elderUser.elderProfile.id)) {
            return { error: 'You have already linked this elder' };
        }

        // Add new ID
        currentLinkedIds.push(elderUser.elderProfile.id);

        // Save back to DB
        await prisma.user.update({
            where: { id: currentUserId },
            data: {
                linkedElderIds: JSON.stringify(currentLinkedIds)
            }
        });

        revalidatePath('/');
        return { success: `Successfully linked to ${elderUser.name || elderUser.email}` };

    } catch (error) {
        console.error('Link elder error:', error);
        return { error: 'Failed to link elder. Please try again.' };
    }
}
