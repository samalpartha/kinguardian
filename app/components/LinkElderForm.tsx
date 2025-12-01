'use client'

import { useActionState } from 'react';
import { linkElder } from '../actions/link';

export default function LinkElderForm() {
    // @ts-ignore
    const [state, formAction] = useActionState(linkElder, null);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center max-w-md mx-auto mt-8">
            <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Link an Elder</h3>
                <p className="text-sm text-gray-500">Enter the email address of the elder you want to care for.</p>
            </div>

            <form action={formAction} className="space-y-3">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="elder@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                    Link Account
                </button>

                {state?.error && (
                    <p className="text-red-600 text-xs bg-red-50 p-2 rounded border border-red-100">
                        {state.error}
                    </p>
                )}

                {state?.success && (
                    <p className="text-green-600 text-xs bg-green-50 p-2 rounded border border-green-100">
                        {state.success}
                    </p>
                )}
            </form>
        </div>
    );
}
