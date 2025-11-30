import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SOSButton from '../components/SOSButton';
import MedicationList from '../components/MedicationList';
import HealthLogger from '../components/HealthLogger';
import { logout } from '../actions/auth';

const prisma = new PrismaClient();

export default async function ElderPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) redirect('/login');

    const elderProfile = await prisma.elderProfile.findUnique({
        where: { ownerUserId: userId },
        include: {
            medicationSchedules: true,
            medicationIntakes: {
                where: {
                    scheduledTime: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }
        }
    });

    if (!elderProfile) return <div>Profile not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Hello, {elderProfile.fullName}</h1>
                    <form action={logout}>
                        <button className="text-sm text-red-600">Logout</button>
                    </form>
                </header>

                <section>
                    <SOSButton />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Today's Medications</h2>
                    <MedicationList schedules={elderProfile.medicationSchedules} intakes={elderProfile.medicationIntakes} />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Log Health</h2>
                    <HealthLogger />
                </section>
            </div>
        </div>
    );
}
