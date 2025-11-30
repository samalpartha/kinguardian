import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { RoleBasedNavigation } from './components/RoleBasedNavigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role-based navigation header */}
      <RoleBasedNavigation user={session?.user} />
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}