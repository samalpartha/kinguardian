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
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 text-center">
                <p className="text-green-800 font-bold text-lg mb-1">✅ SOS Alert Sent!</p>
                <p className="text-green-700 text-sm">Your family and caregivers have been notified.</p>
            </div>
        );
    }

    return (
        <button
            onClick={handleSOS}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl h-24 text-2xl font-bold shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
            {loading ? (
                <span>⏳ Sending...</span>
            ) : (
                <span>🚨 SOS Emergency</span>
            )}
        </button>
    );
}
