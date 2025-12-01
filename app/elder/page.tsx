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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-3 sm:p-4">
            <div className="max-w-xl mx-auto space-y-4">
                <header className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Hello, {elderProfile.fullName.split(' ')[0]}! 👋</h1>
                        <p className="text-sm text-gray-500">Stay safe and healthy today</p>
                    </div>
                    <form action={logout}>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
                    </form>
                </header>

                <section className="flex justify-center">
                    <div className="w-full max-w-md">
                        <SOSButton />
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">💊 Today's Medications</h2>
                    <MedicationList schedules={elderProfile.medicationSchedules} intakes={elderProfile.medicationIntakes} />
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">📝 Log Health</h2>
                    <HealthLogger />
                </section>
            </div>
        </div>
    );
}
