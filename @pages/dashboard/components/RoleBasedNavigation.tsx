'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationConfig = {
  ELDER: [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Medications', href: '/dashboard/medications', icon: '💊' },
    { name: 'Health Log', href: '/dashboard/health', icon: '📊' },
  ],
  FAMILY: [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Elders', href: '/dashboard/elders', icon: '👵' },
    { name: 'Alerts', href: '/dashboard/alerts', icon: '🚨' },
  ],
  CAREGIVER: [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'My Elders', href: '/dashboard/elders', icon: '👵' },
    { name: 'Medications', href: '/dashboard/medications', icon: '💊' },
    { name: 'Health Logs', href: '/dashboard/health', icon: '📊' },
  ],
  DOCTOR: [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Patients', href: '/dashboard/patients', icon: '👵' },
    { name: 'Health Data', href: '/dashboard/health-data', icon: '📊' },
  ],
};

export const RoleBasedNavigation = ({ user }: { user: any }) => {
  const pathname = usePathname();
  const userRole = user?.role || 'ELDER';
  const navItems = navigationConfig[userRole as keyof typeof navigationConfig] || [];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">KinGuardian</h1>
            <nav className="ml-8 flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {user?.name} ({userRole.toLowerCase()})
            </span>
            <button className="text-gray-700 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};