'use server'
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function triggerSOS() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return { error: 'Not authenticated' };

    const elderProfile = await prisma.elderProfile.findUnique({
        where: { ownerUserId: userId },
    });

    if (!elderProfile) return { error: 'Profile not found' };

    await prisma.sosEvent.create({
        data: {
            elderId: elderProfile.id,
            triggeredByUserId: userId,
            status: 'Open',
        },
    });

    return { success: true };
}

export async function acknowledgeSOS(eventId: string) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return { error: 'Not authenticated' };

    await prisma.sosEvent.update({
        where: { id: eventId },
        data: {
            status: 'Acknowledged',
            acknowledgedByUserId: userId,
            acknowledgedAt: new Date(),
        },
    });

    revalidatePath('/family');
    revalidatePath('/caregiver');
    return { success: true };
}

export async function resolveSOS(eventId: string) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return { error: 'Not authenticated' };

    await prisma.sosEvent.update({
        where: { id: eventId },
        data: {
            status: 'Resolved',
            resolvedByUserId: userId,
            resolvedAt: new Date(),
        },
    });

    revalidatePath('/family');
    revalidatePath('/caregiver');
    return { success: true };
}

