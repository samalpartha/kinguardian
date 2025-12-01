'use client'
import { useState } from 'react';
import { acknowledgeSOS, resolveSOS } from '../actions/sos';

interface SOSEvent {
    id: string;
    triggeredAt: Date;
    status: string;
    locationLabel?: string | null;
    contextNotes?: string | null;
    acknowledgedAt?: Date | null;
    resolvedAt?: Date | null;
}

export default function SOSManager({ sosEvents }: { sosEvents: SOSEvent[] }) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleAcknowledge = async (eventId: string) => {
        setLoading(eventId);
        await acknowledgeSOS(eventId);
        setLoading(null);
        window.location.reload();
    };

    const handleResolve = async (eventId: string) => {
        setLoading(eventId);
        await resolveSOS(eventId);
        setLoading(null);
        window.location.reload();
    };

    if (sosEvents.length === 0) {
        return <p className="text-gray-500">No active SOS events</p>;
    }

    return (
        <div className="space-y-4">
            {sosEvents.map(event => (
                <div key={event.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-red-800">
                                SOS Alert - {event.status}
                            </p>
                            <p className="text-sm text-gray-600">
                                Triggered: {new Date(event.triggeredAt).toLocaleString()}
                            </p>
                            {event.locationLabel && (
                                <p className="text-sm text-gray-600">
                                    Location: {event.locationLabel}
                                </p>
                            )}
                            {event.contextNotes && (
                                <p className="text-sm text-gray-600">
                                    Notes: {event.contextNotes}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {event.status === 'Open' && (
                                <>
                                    <button
                                        onClick={() => handleAcknowledge(event.id)}
                                        disabled={loading === event.id}
                                        className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 disabled:opacity-50"
                                    >
                                        {loading === event.id ? 'Processing...' : 'Acknowledge'}
                                    </button>
                                    <button
                                        onClick={() => handleResolve(event.id)}
                                        disabled={loading === event.id}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {loading === event.id ? 'Processing...' : 'Resolve'}
                                    </button>
                                </>
                            )}
                            {event.status === 'Acknowledged' && (
                                <button
                                    onClick={() => handleResolve(event.id)}
                                    disabled={loading === event.id}
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                                >
                                    {loading === event.id ? 'Processing...' : 'Resolve'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
