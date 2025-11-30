import React from 'react';

export const DoctorDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
      <p className="text-gray-600">Review patient health data and summaries</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">👵 Patient Overview</h3>
          <p className="text-gray-600">Review assigned patients</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View Patients
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">📈 Health Trends</h3>
          <p className="text-gray-600">Analyze patient health data</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View Trends
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">📋 Medical History</h3>
          <p className="text-gray-600">Access patient records</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            View Records
          </button>
        </div>
      </div>
    </div>
  );
};