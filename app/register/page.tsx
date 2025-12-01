'use client'

import { useActionState } from 'react';
import { register } from '../actions/register';
import Link from 'next/link';

export default function RegisterPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(register, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-1">Create Account</h1>
                    <p className="text-xs text-gray-500">Join KinGuardian</p>
                </div>
                <form action={formAction} className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Min. 6 characters"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">I am a...</label>
                        <select
                            name="role"
                            required
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select your role</option>
                            <option value="Elder">Elder (Senior living alone)</option>
                            <option value="Family">Family Member</option>
                            <option value="Caregiver">Caregiver</option>
                            <option value="Doctor">Doctor/Healthcare Provider</option>
                        </select>
                    </div>
                    {state?.error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                            {state.error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-800 mb-2">📝 Role Descriptions:</p>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li><strong>Elder:</strong> Access SOS, medication tracking, health logging</li>
                            <li><strong>Family:</strong> Monitor loved ones, receive SOS alerts</li>
                            <li><strong>Caregiver:</strong> Manage care activities, track health</li>
                            <li><strong>Doctor:</strong> Review patient medical history</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
