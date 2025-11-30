'use server'
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

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
