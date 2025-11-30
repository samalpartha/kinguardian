import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '../actions/auth';

const prisma = new PrismaClient();

export default async function CaregiverPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) redirect('/login');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) redirect('/login');

    let linkedElderIds: string[] = [];
    try {
        linkedElderIds = JSON.parse(user.linkedElderIds);
    } catch (e) {
        linkedElderIds = [];
    }

    const elders = await prisma.elderProfile.findMany({
        where: {
            id: { in: linkedElderIds }
        },
        include: {
            sosEvents: {
                where: { status: 'Open' }
            }
        }
    });

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800">Caregiver Dashboard</h1>
                    <form action={logout}>
                        <button className="text-red-600 hover:text-red-800">Logout</button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {elders.map(elder => (
                        <div key={elder.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{elder.fullName}</h2>
                                    <p className="text-sm text-gray-500">Risk Level: <span className={`font-bold ${elder.riskLevel === 'High' ? 'text-red-600' : elder.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{elder.riskLevel}</span></p>
                                </div>
                                {elder.sosEvents.length > 0 && (
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded animate-pulse">
                                        OPEN SOS
                                    </span>
                                )}
                            </div>

                            <div className="mt-6">
                                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                                    Manage Care
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
