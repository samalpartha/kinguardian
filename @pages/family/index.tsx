import React from 'react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';

export default function DoctorDashboard() {
  return (
    <DashboardLayout userRole="DOCTOR" userName="Doctor Name">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p>Review patient health data and summaries.</p>
        {/* Add doctor-specific components */}
      </div>
    </DashboardLayout>
  );
}