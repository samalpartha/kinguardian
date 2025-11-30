import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '../actions/auth';

const prisma = new PrismaClient();

export default async function FamilyPage() {
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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Family Dashboard</h1>
                    <form action={logout}>
                        <button className="text-red-600 hover:text-red-800">Logout</button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {elders.map(elder => (
                        <div key={elder.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
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

                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Recent Falls:</span>
                                    <span className={elder.hasRecentFallHistory ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                        {elder.hasRecentFallHistory ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Recent Hospitalization:</span>
                                    <span className={elder.riskProfile_recentHospitalization ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                        {elder.riskProfile_recentHospitalization ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                    {elders.length === 0 && (
                        <p className="text-gray-500">No elders linked to your account.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
