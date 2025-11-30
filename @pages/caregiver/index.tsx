import React from 'react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function CaregiverDashboard() {
  return (
    <DashboardLayout userRole="CAREGIVER" userName="Caregiver Name">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Caregiver Dashboard</h1>
        <p>Manage your assigned elders and their care plans.</p>
        {/* Add caregiver-specific components */}
      </div>
    </DashboardLayout>
  );
}