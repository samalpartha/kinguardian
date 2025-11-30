'use server'
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function logHealth(type: string, value: any) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return { error: 'Not authenticated' };

    const elderProfile = await prisma.elderProfile.findUnique({
        where: { ownerUserId: userId },
    });
    if (!elderProfile) return { error: 'Profile not found' };

    const data: any = {
        elderId: elderProfile.id,
        type,
        createdByUserId: userId,
    };

    if (type === 'BP') {
        data.systolic = parseInt(value.systolic);
        data.diastolic = parseInt(value.diastolic);
    } else if (type === 'Glucose') {
        data.glucoseValue = parseFloat(value.glucose);
    } else if (type === 'Fall') {
        data.note = value.note || 'Fall reported';
    } else if (type === 'Note') {
        data.note = value.note;
    }

    await prisma.healthLog.create({ data });
    revalidatePath('/elder');
    return { success: true };
}
