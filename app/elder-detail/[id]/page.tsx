import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '../../actions/auth';
import SOSManager from '../../components/SOSManager';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function ElderDetailPage({ params }: { params: { id: string } }) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) redirect('/login');

    const { id } = await params;

    const elderProfile = await prisma.elderProfile.findUnique({
        where: { id },
        include: {
            medicationSchedules: true,
            healthLogs: {
                orderBy: { timestamp: 'desc' },
                take: 10,
            },
            sosEvents: {
                where: { status: { in: ['Open', 'Acknowledged'] } },
                orderBy: { triggeredAt: 'desc' },
            },
            dailySummaries: {
                orderBy: { date: 'desc' },
                take: 7,
            },
        },
    });

    if (!elderProfile) return <div>Elder not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/family" className="text-blue-600 hover:underline mb-2 block">
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">{elderProfile.fullName}</h1>
                        <p className="text-gray-600">Risk Level: <span className={`font-bold ${elderProfile.riskLevel === 'High' ? 'text-red-600' : elderProfile.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{elderProfile.riskLevel}</span></p>
                    </div>
                    <form action={logout}>
                        <button className="text-red-600 hover:text-red-800">Logout</button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SOS Events */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Active SOS Events</h2>
                        <SOSManager sosEvents={elderProfile.sosEvents} />
                    </section>

                    {/* Risk Profile */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">30-Day Risk Profile</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Falls:</span>
                                <span className={elderProfile.riskProfile_fallCount30d > 0 ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                    {elderProfile.riskProfile_fallCount30d}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">SOS Events:</span>
                                <span className="text-gray-900">{elderProfile.riskProfile_sosCount30d}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">High BP Events:</span>
                                <span className={elderProfile.riskProfile_highBpCount30d > 2 ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                    {elderProfile.riskProfile_highBpCount30d}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Recent Hospitalization:</span>
                                <span className={elderProfile.riskProfile_recentHospitalization ? 'text-red-600 font-bold' : 'text-gray-900'}>
                                    {elderProfile.riskProfile_recentHospitalization ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Medications */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Medication Schedule</h2>
                        <div className="space-y-3">
                            {elderProfile.medicationSchedules.map(med => (
                                <div key={med.id} className="border-b pb-2 last:border-0">
                                    <p className="font-medium">{med.medicationName}</p>
                                    <p className="text-sm text-gray-600">{med.dosage}</p>
                                    <p className="text-sm text-gray-500">Times: {JSON.parse(med.scheduleTimes).join(', ')}</p>
                                    {med.notes && <p className="text-xs text-gray-400">{med.notes}</p>}
                                </div>
                            ))}
                            {elderProfile.medicationSchedules.length === 0 && (
                                <p className="text-gray-500">No medications scheduled</p>
                            )}
                        </div>
                    </section>

                    {/* Recent Health Logs */}
                    <section className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Health Logs</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {elderProfile.healthLogs.map(log => (
                                <div key={log.id} className="border-b pb-2 last:border-0">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-sm">{log.type}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(log.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {log.type === 'BP' && log.systolic && log.diastolic && (
                                        <p className="text-sm text-gray-700">{log.systolic}/{log.diastolic} mmHg</p>
                                    )}
                                    {log.type === 'Glucose' && log.glucoseValue && (
                                        <p className="text-sm text-gray-700">{log.glucoseValue} mg/dL</p>
                                    )}
                                    {log.note && <p className="text-xs text-gray-600">{log.note}</p>}
                                </div>
                            ))}
                            {elderProfile.healthLogs.length === 0 && (
                                <p className="text-gray-500">No health logs yet</p>
                            )}
                        </div>
                    </section>

                    {/* Weekly Summary */}
                    <section className="bg-white rounded-lg shadow p-6 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">7-Day Summary</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Date</th>
                                        <th className="text-center py-2">Meds Taken</th>
                                        <th className="text-center py-2">Meds Missed</th>
                                        <th className="text-center py-2">Falls</th>
                                        <th className="text-center py-2">SOS</th>
                                        <th className="text-center py-2">High BP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elderProfile.dailySummaries.map(summary => (
                                        <tr key={summary.id} className="border-b">
                                            <td className="py-2">{new Date(summary.date).toLocaleDateString()}</td>
                                            <td className="text-center text-green-600">{summary.medsTaken}</td>
                                            <td className="text-center text-red-600">{summary.medsMissed}</td>
                                            <td className="text-center">{summary.fallCount}</td>
                                            <td className="text-center">{summary.sosCount}</td>
                                            <td className="text-center">{summary.highBpEvents}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {elderProfile.dailySummaries.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No daily summaries available</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
