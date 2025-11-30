'use client'

import { useFormState } from 'react-dom';
import { login } from '../actions/auth';

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction] = useFormState(login, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">KinGuardian Login</h1>
                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="elder@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="password"
                        />
                    </div>
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-sm text-gray-500">
                    <p>Demo Accounts:</p>
                    <ul className="list-disc pl-5">
                        <li>elder@example.com / password</li>
                        <li>family@example.com / password</li>
                        <li>caregiver@example.com / password</li>
                        <li>doctor@example.com / password</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
