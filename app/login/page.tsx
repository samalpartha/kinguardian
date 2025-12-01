'use client'

import { useActionState } from 'react';
import { login } from '../actions/auth';
import Link from 'next/link';

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(login, null);

    return (
        <div className="min-h-screen flex w-full bg-gray-50">
            {/* Left Side - Branding & Image */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90 z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>

                <div className="relative z-20 text-white p-12 max-w-lg">
                    <div className="mb-8">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                            ❤️ Trusted by 10,000+ Families
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Care for your loved ones, <span className="text-blue-200">even from afar.</span>
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        KinGuardian connects elders with their families, caregivers, and doctors in one secure, easy-to-use platform.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                            <div className="text-3xl mb-2">🚨</div>
                            <h3 className="font-bold text-lg">Instant SOS</h3>
                            <p className="text-sm text-blue-100">One-touch emergency alerts with location tracking</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                            <div className="text-3xl mb-2">💊</div>
                            <h3 className="font-bold text-lg">Medication</h3>
                            <p className="text-sm text-blue-100">Smart reminders and intake tracking</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-600">Please sign in to your account</p>
                    </div>

                    <form action={formAction} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{state.error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-700/40 transition-all transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">New to KinGuardian?</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors bg-white"
                        >
                            Create New Account
                        </Link>
                    </div>

                    <div className="pt-8">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-4 text-center">Quick Demo Access</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                                <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">Elder</p>
                                <p className="text-[10px] text-gray-500">elder@example.com</p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                                <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">Family</p>
                                <p className="text-[10px] text-gray-500">family@example.com</p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                                <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">Caregiver</p>
                                <p className="text-[10px] text-gray-500">caregiver@example.com</p>
                            </div>
                            <div className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                                <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600">Doctor</p>
                                <p className="text-[10px] text-gray-500">doctor@example.com</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-3">Password for all: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">password</code></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
