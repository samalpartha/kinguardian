'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function register(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: 'Email already registered' };
    }

    // Create new user
    const user = await prisma.user.create({
        data: {
            email,
            password, // In production, hash this!
            name,
            role,
            linkedElderIds: '[]',
        },
    });

    // If role is Elder, create elder profile
    if (role === 'Elder') {
        await prisma.elderProfile.create({
            data: {
                ownerUserId: user.id,
                fullName: name,
                dateOfBirth: new Date('1950-01-01'), // Default, can be updated later
                gender: 'Not specified',
                timezone: 'America/New_York',
                primaryConditions: '[]',
            },
        });
    }

    // Auto-login after registration
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id);
    cookieStore.set('role', user.role);

    // Redirect based on role
    switch (user.role) {
        case 'Elder':
            redirect('/elder');
        case 'Family':
            redirect('/family');
        case 'Caregiver':
            redirect('/caregiver');
        case 'Doctor':
            redirect('/doctor');
        default:
            redirect('/');
    }
}
