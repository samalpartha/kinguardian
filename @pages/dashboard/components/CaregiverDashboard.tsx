import React from 'react';

export const CaregiverDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Caregiver Dashboard</h1>
      <p className="text-gray-600">Manage your assigned elders and their care plans</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">👵 Assigned Elders</h3>
          <p className="text-gray-600">View and manage your elder assignments</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View All
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">💊 Medication Schedule</h3>
          <p className="text-gray-600">Manage medication administration</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View Schedule
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Health Monitoring</h3>
          <p className="text-gray-600">Track health metrics and events</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View Health Data
          </button>
        </div>
      </div>
    </div>
  );
};