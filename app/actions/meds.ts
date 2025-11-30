'use server'
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function logMedication(scheduleId: string, status: string) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return { error: 'Not authenticated' };

    const elderProfile = await prisma.elderProfile.findUnique({
        where: { ownerUserId: userId },
    });
    if (!elderProfile) return { error: 'Profile not found' };

    await prisma.medicationIntake.create({
        data: {
            elderId: elderProfile.id,
            medicationScheduleId: scheduleId,
            scheduledTime: new Date(), // Simplified
            status,
            recordedByUserId: userId,
        },
    });

    revalidatePath('/elder');
    return { success: true };
}
