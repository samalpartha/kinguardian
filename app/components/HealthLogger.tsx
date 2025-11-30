'use client'
import { useState } from 'react';
import { logHealth } from '../actions/logs';

export default function HealthLogger() {
    const [type, setType] = useState('Note');
    const [note, setNote] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [glucose, setGlucose] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await logHealth(type, { note, systolic, diastolic, glucose });
        setNote('');
        setSystolic('');
        setDiastolic('');
        setGlucose('');
        alert('Logged successfully');
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex space-x-2 mb-4 overflow-x-auto">
                {['Note', 'Fall', 'BP', 'Glucose'].map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-3 py-1 rounded ${type === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {type === 'BP' && (
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Systolic"
                            value={systolic}
                            onChange={e => setSystolic(e.target.value)}
                            className="border p-2 rounded w-1/2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Diastolic"
                            value={diastolic}
                            onChange={e => setDiastolic(e.target.value)}
                            className="border p-2 rounded w-1/2"
                            required
                        />
                    </div>
                )}

                {type === 'Glucose' && (
                    <input
                        type="number"
                        placeholder="Glucose Level"
                        value={glucose}
                        onChange={e => setGlucose(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                )}

                {(type === 'Note' || type === 'Fall') && (
                    <textarea
                        placeholder={type === 'Fall' ? 'Describe the fall...' : 'Add a note...'}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="border p-2 rounded w-full"
                        required={type === 'Note'}
                    />
                )}

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Log {type}
                </button>
            </form>
        </div>
    );
}
