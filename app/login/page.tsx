'use client'

import { useActionState } from 'react';
import { login } from '../actions/auth';

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(login, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-1">KinGuardian</h1>
                    <p className="text-xs text-gray-500">Safety & Care for Your Loved Ones</p>
                </div>
                <form action={formAction} className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="elder@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="password"
                        />
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
                        Sign In
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-600 mb-2">Don't have an account?</p>
                    <a href="/register" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Create New Account →
                    </a>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-2">Demo Accounts:</p>
                    <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-gray-600">
                            <span>Elder:</span>
                            <span className="font-mono">elder@example.com</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Family:</span>
                            <span className="font-mono">family@example.com</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Caregiver:</span>
                            <span className="font-mono">caregiver@example.com</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Doctor:</span>
                            <span className="font-mono">doctor@example.com</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Password: <code className="bg-gray-100 px-1 rounded">password</code></p>
                </div>
            </div>
        </div>
    );
}
