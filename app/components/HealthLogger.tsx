'use client'
import { useState, useEffect } from 'react';
import { logHealth } from '../actions/logs';

export default function HealthLogger() {
    const [type, setType] = useState('Note');
    const [note, setNote] = useState('');
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [glucose, setGlucose] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await logHealth(type, { note, systolic, diastolic, glucose });
        setNote('');
        setSystolic('');
        setDiastolic('');
        setGlucose('');
        setSuccess(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex gap-2 mb-3 overflow-x-auto">
                {['Note', 'Fall', 'BP', 'Glucose'].map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${type === t
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {type === 'BP' && (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Systolic"
                            value={systolic}
                            onChange={e => setSystolic(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-1/2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Diastolic"
                            value={diastolic}
                            onChange={e => setDiastolic(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-1/2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                )}

                {type === 'Glucose' && (
                    <input
                        type="number"
                        placeholder="Glucose Level (mg/dL)"
                        value={glucose}
                        onChange={e => setGlucose(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                )}

                {(type === 'Note' || type === 'Fall') && (
                    <textarea
                        placeholder={type === 'Fall' ? 'Describe the fall...' : 'Add a note...'}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        required={type === 'Note'}
                    />
                )}

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                    Log {type}
                </button>

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-md text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Successfully logged {type}!</span>
                    </div>
                )}
            </form>
        </div>
    );
}
