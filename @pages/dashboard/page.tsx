import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { ElderDashboard } from './components/ElderDashboard';
import { FamilyDashboard } from './components/FamilyDashboard';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';

// Mock function to get user role - replace with your actual data fetching
async function getUserRole(userId: string) {
  // This should come from your database
  // For now, we'll use a mock
  return 'ELDER'; // or 'FAMILY', 'CAREGIVER', 'DOCTOR'
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Please log in to access the dashboard</div>;
  }

  const userRole = await getUserRole(session.user.id);

  // Render the appropriate dashboard based on role
  const renderDashboard = () => {
    switch (userRole) {
      case 'ELDER':
        return <ElderDashboard user={session.user} />;
      case 'FAMILY':
        return <FamilyDashboard user={session.user} />;
      case 'CAREGIVER':
        return <CaregiverDashboard user={session.user} />;
      case 'DOCTOR':
        return <DoctorDashboard user={session.user} />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderDashboard()}
    </div>
  );
}