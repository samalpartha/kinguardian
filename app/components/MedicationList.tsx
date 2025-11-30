'use client'
import { useState } from 'react';
import { logMedication } from '../actions/meds';

export default function MedicationList({ schedules, intakes }: { schedules: any[], intakes: any[] }) {

    const isTaken = (scheduleId: string) => {
        return intakes.some(i => i.medicationScheduleId === scheduleId && i.status === 'Taken');
    };

    const handleTake = async (id: string) => {
        await logMedication(id, 'Taken');
    };

    return (
        <div className="bg-white rounded shadow p-4 space-y-4">
            {schedules.map(schedule => (
                <div key={schedule.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                        <p className="font-medium">{schedule.medicationName}</p>
                        <p className="text-sm text-gray-500">{schedule.dosage} - {JSON.parse(schedule.scheduleTimes).join(', ')}</p>
                    </div>
                    {isTaken(schedule.id) ? (
                        <span className="text-green-600 font-bold">Taken</span>
                    ) : (
                        <button
                            onClick={() => handleTake(schedule.id)}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                        >
                            Take
                        </button>
                    )}
                </div>
            ))}
            {schedules.length === 0 && <p className="text-gray-500">No medications scheduled.</p>}
        </div>
    );
}
