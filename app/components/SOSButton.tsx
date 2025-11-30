'use client'
import { useState } from 'react';
import { triggerSOS } from '../actions/sos';

export default function SOSButton() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSOS = async () => {
        setLoading(true);
        await triggerSOS();
        setLoading(false);
        setSent(true);
    };

    if (sent) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                <strong className="font-bold">SOS Sent!</strong>
                <span className="block sm:inline"> Help is on the way.</span>
            </div>
        );
    }

    return (
        <button
            onClick={handleSOS}
            disabled={loading}
            className="w-full bg-red-600 text-white rounded-full h-32 text-3xl font-bold shadow-lg hover:bg-red-700 transition animate-pulse"
        >
            {loading ? 'Sending...' : 'SOS'}
        </button>
    );
}
