'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.password !== password) {
        return { error: 'Invalid credentials' };
    }

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

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('userId');
    cookieStore.delete('role');
    redirect('/login');
}
