import React from 'react';
import { ElderDashboard } from './components/ElderDashboard';
import { FamilyDashboard } from './components/FamilyDashboard';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';

// Mock user data - change the role to test different dashboards
const mockUser = {
  id: '1',
  name: 'Mary Johnson',
  role: 'ELDER', // Change this to: 'FAMILY', 'CAREGIVER', or 'DOCTOR'
  email: 'mary@example.com'
};

export default function DashboardPage() {
  const userRole = mockUser.role;

  const renderDashboard = () => {
    switch (userRole) {
      case 'ELDER':
        return <ElderDashboard user={mockUser} />;
      case 'FAMILY':
        return <FamilyDashboard user={mockUser} />;
      case 'CAREGIVER':
        return <CaregiverDashboard user={mockUser} />;
      case 'DOCTOR':
        return <DoctorDashboard user={mockUser} />;
      default:
        return <div>Unknown user role: {userRole}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">KinGuardian</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {mockUser.name} ({mockUser.role.toLowerCase()})
              </span>
              <button className="text-gray-700 hover:text-gray-900 text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderDashboard()}
      </main>
    </div>
  );
}