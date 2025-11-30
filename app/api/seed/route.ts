import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Cleanup existing data
    await prisma.sosEvent.deleteMany();
    await prisma.healthLog.deleteMany();
    await prisma.medicationIntake.deleteMany();
    await prisma.medicationSchedule.deleteMany();
    await prisma.elderProfile.deleteMany();
    await prisma.user.deleteMany();

    // Create Elder
    const elderUser = await prisma.user.create({
      data: {
        email: 'elder@example.com',
        password: 'password', // In real app, hash this
        name: 'Alice Elder',
        role: 'Elder',
        linkedElderIds: "[]",
      },
    });

    const elderProfile = await prisma.elderProfile.create({
      data: {
        ownerUserId: elderUser.id,
        fullName: 'Alice Elder',
        dateOfBirth: new Date('1950-01-01'),
        gender: 'Female',
        timezone: 'UTC',
        primaryConditions: JSON.stringify(['Hypertension']),
        riskLevel: 'Low',
      },
    });

    // Create Family
    const familyUser = await prisma.user.create({
      data: {
        email: 'family@example.com',
        password: 'password',
        name: 'Bob Family',
        role: 'Family',
        linkedElderIds: JSON.stringify([elderProfile.id]),
      },
    });

    // Create Caregiver
    const caregiverUser = await prisma.user.create({
      data: {
        email: 'caregiver@example.com',
        password: 'password',
        name: 'Charlie Caregiver',
        role: 'Caregiver',
        linkedElderIds: JSON.stringify([elderProfile.id]),
      },
    });

    // Create Doctor
    const doctorUser = await prisma.user.create({
      data: {
        email: 'doctor@example.com',
        password: 'password',
        name: 'Dr. Smith',
        role: 'Doctor',
        linkedElderIds: JSON.stringify([elderProfile.id]),
      },
    });

    // Create Medication Schedule
    await prisma.medicationSchedule.create({
      data: {
        elderId: elderProfile.id,
        medicationName: 'Lisinopril',
        dosage: '10mg',
        scheduleTimes: JSON.stringify(['08:00', '20:00']),
        notes: 'Take with food',
      },
    });

    return NextResponse.json({ success: true, message: 'Database seeded' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
