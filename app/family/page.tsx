import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '../actions/auth';
import Link from 'next/link';
import LinkElderForm from '../components/LinkElderForm';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-3 sm:p-6">
            <div className="max-w-5xl mx-auto">
                <header className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">👨‍👩‍👧 Family Dashboard</h1>
                        <p className="text-sm text-gray-500">Monitor your loved ones</p>
                    </div>
                    <form action={logout}>
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm">Logout</button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {elders.map(elder => (
                        <div key={elder.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">{elder.fullName}</h2>
                                    <p className="text-xs text-gray-500">
                                        Risk: <span className={`font-bold ${elder.riskLevel === 'High' ? 'text-red-600' : elder.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{elder.riskLevel}</span>
                                    </p>
                                </div>
                                {elder.sosEvents.length > 0 && (
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full animate-pulse">
                                        🚨 SOS
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1.5 mb-4 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Recent Falls:</span>
                                    <span className={elder.hasRecentFallHistory ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                        {elder.hasRecentFallHistory ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Hospitalization:</span>
                                    <span className={elder.riskProfile_recentHospitalization ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                        {elder.riskProfile_recentHospitalization ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            <Link href={`/elder-detail/${elder.id}`} className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium">
                                View Details
                            </Link>
                        </div>
                    ))}
                    {elders.length === 0 && (
                        <div className="col-span-full">
                            <div className="text-center py-8 bg-white rounded-lg border border-gray-200 mb-6">
                                <p className="text-gray-500">No elders linked to your account yet.</p>
                            </div>
                            <LinkElderForm />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
