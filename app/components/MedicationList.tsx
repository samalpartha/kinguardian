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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 space-y-2">
            {schedules.map(schedule => (
                <div key={schedule.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{schedule.medicationName}</p>
                        <p className="text-xs text-gray-500">{schedule.dosage} • {JSON.parse(schedule.scheduleTimes).join(', ')}</p>
                    </div>
                    {isTaken(schedule.id) ? (
                        <span className="text-green-600 font-semibold text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Taken
                        </span>
                    ) : (
                        <button
                            onClick={() => handleTake(schedule.id)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            Take
                        </button>
                    )}
                </div>
            ))}
            {schedules.length === 0 && <p className="text-gray-500 text-sm text-center py-2">No medications scheduled.</p>}
        </div>
    );
}
