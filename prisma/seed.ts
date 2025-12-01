import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create Elder User
    const elderUser = await prisma.user.upsert({
        where: { email: 'elder@example.com' },
        update: {},
        create: {
            email: 'elder@example.com',
            password: 'password',
            name: 'Elder John',
            role: 'Elder',
            linkedElderIds: '[]',
        },
    });

    console.log('✓ Created elder user');

    // Create Elder Profile
    const elderProfile = await prisma.elderProfile.upsert({
        where: { ownerUserId: elderUser.id },
        update: {},
        create: {
            ownerUserId: elderUser.id,
            fullName: 'John Doe',
            dateOfBirth: new Date('1950-01-01'),
            gender: 'Male',
            timezone: 'America/New_York',
            primaryConditions: JSON.stringify(['Hypertension', 'Diabetes Type 2']),
            riskLevel: 'Medium',
            hasRecentFallHistory: true,
            riskProfile_fallCount30d: 2,
            riskProfile_sosCount30d: 1,
            riskProfile_highBpCount30d: 3,
        },
    });

    console.log('✓ Created elder profile');

    // Create Medication Schedules
    const med1 = await prisma.medicationSchedule.create({
        data: {
            elderId: elderProfile.id,
            medicationName: 'Lisinopril',
            dosage: '10mg',
            scheduleTimes: JSON.stringify(['08:00', '20:00']),
            notes: 'Take with food',
        },
    });

    const med2 = await prisma.medicationSchedule.create({
        data: {
            elderId: elderProfile.id,
            medicationName: 'Metformin',
            dosage: '500mg',
            scheduleTimes: JSON.stringify(['08:00', '12:00', '18:00']),
            notes: 'For blood sugar control',
        },
    });

    const med3 = await prisma.medicationSchedule.create({
        data: {
            elderId: elderProfile.id,
            medicationName: 'Aspirin',
            dosage: '81mg',
            scheduleTimes: JSON.stringify(['08:00']),
            notes: 'Blood thinner',
        },
    });

    console.log('✓ Created medication schedules');

    // Create some medication intakes for today
    const today = new Date();
    await prisma.medicationIntake.create({
        data: {
            elderId: elderProfile.id,
            medicationScheduleId: med1.id,
            scheduledTime: new Date(today.setHours(8, 0, 0, 0)),
            status: 'Taken',
            recordedByUserId: elderUser.id,
        },
    });

    console.log('✓ Created sample medication intakes');

    // Create Health Logs
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await prisma.healthLog.create({
        data: {
            elderId: elderProfile.id,
            type: 'BP',
            systolic: 145,
            diastolic: 92,
            note: 'Feeling slightly dizzy',
            createdByUserId: elderUser.id,
            timestamp: yesterday,
        },
    });

    await prisma.healthLog.create({
        data: {
            elderId: elderProfile.id,
            type: 'Glucose',
            glucoseValue: 128.5,
            note: 'Before breakfast',
            createdByUserId: elderUser.id,
            timestamp: new Date(),
        },
    });

    await prisma.healthLog.create({
        data: {
            elderId: elderProfile.id,
            type: 'Fall',
            note: 'Slipped in bathroom, no injuries',
            createdByUserId: elderUser.id,
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
    });

    console.log('✓ Created health logs');

    // Create a sample SOS event (resolved)
    await prisma.sosEvent.create({
        data: {
            elderId: elderProfile.id,
            triggeredByUserId: elderUser.id,
            status: 'Resolved',
            locationLabel: 'Home',
            contextNotes: 'False alarm - accidentally pressed button',
            triggeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
    });

    console.log('✓ Created sample SOS events');

    // Create Family Member
    await prisma.user.upsert({
        where: { email: 'family@example.com' },
        update: {},
        create: {
            email: 'family@example.com',
            password: 'password',
            name: 'Jane Doe',
            role: 'Family',
            linkedElderIds: JSON.stringify([elderProfile.id]),
        },
    });

    console.log('✓ Created family member');

    // Create Caregiver
    await prisma.user.upsert({
        where: { email: 'caregiver@example.com' },
        update: {},
        create: {
            email: 'caregiver@example.com',
            password: 'password',
            name: 'Bob Johnson',
            role: 'Caregiver',
            linkedElderIds: JSON.stringify([elderProfile.id]),
        },
    });

    console.log('✓ Created caregiver');

    // Create Doctor
    await prisma.user.upsert({
        where: { email: 'doctor@example.com' },
        update: {},
        create: {
            email: 'doctor@example.com',
            password: 'password',
            name: 'Dr. Sarah Smith',
            role: 'Doctor',
            linkedElderIds: JSON.stringify([elderProfile.id]),
        },
    });

    console.log('✓ Created doctor');

    // Create Daily Summary
    await prisma.dailySummary.create({
        data: {
            elderId: elderProfile.id,
            date: new Date(today.setHours(0, 0, 0, 0)),
            medsTaken: 1,
            medsMissed: 2,
            medsLate: 0,
            medsSkipped: 0,
            fallCount: 0,
            sosCount: 0,
            highBpEvents: 1,
        },
    });

    console.log('✓ Created daily summary');

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📋 Demo Accounts:');
    console.log('   Elder:     elder@example.com / password');
    console.log('   Family:    family@example.com / password');
    console.log('   Caregiver: caregiver@example.com / password');
    console.log('   Doctor:    doctor@example.com / password');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Seeding failed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
