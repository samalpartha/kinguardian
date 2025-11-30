import React from 'react';

export const ElderDashboard = ({ user }: { user: any }) => {
  const triggerSOS = () => {
    if (confirm('Are you sure you want to trigger an emergency SOS alert?')) {
      alert('SOS alert sent! Help is on the way.');
      // TODO: Connect to real API
    }
  };

  const markMedicationTaken = (medId: string) => {
    alert(`Marked medication ${medId} as taken`);
    // TODO: Connect to real API
  };

  const logHealthEvent = (type: string) => {
    alert(`Logging ${type} event`);
    // TODO: Connect to real API
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency SOS Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Emergency Assistance
              </h2>
              <button
                onClick={triggerSOS}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg text-xl font-bold transition-colors animate-pulse hover:animate-none"
              >
                🚨 EMERGENCY SOS
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Press this button in case of emergency to alert your family and caregivers
              </p>
            </div>
          </div>
        </div>

        {/* Today's Medications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Today's Medications</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Blood Pressure Medication</h4>
                    <p className="text-sm text-gray-600">10mg at 08:00</p>
                  </div>
                  <button 
                    onClick={() => markMedicationTaken('bp-med')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Taken
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Diabetes Medication</h4>
                    <p className="text-sm text-gray-600">5mg at 12:00</p>
                  </div>
                  <button 
                    onClick={() => markMedicationTaken('diabetes-med')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Taken
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Health Logging */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Quick Health Log</h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => logHealthEvent('fall')}
                  className="bg-red-600 hover:bg-red-700 text-white p-3 rounded text-sm"
                >
                  🚨 Log Fall
                </button>
                <button 
                  onClick={() => logHealthEvent('blood-pressure')}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-sm"
                >
                  💓 Log BP
                </button>
                <button 
                  onClick={() => logHealthEvent('glucose')}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-sm"
                >
                  🩸 Log Glucose
                </button>
                <button 
                  onClick={() => logHealthEvent('note')}
                  className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded text-sm"
                >
                  📝 Add Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Health</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">BP</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-lg">120/80</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">Glucose</span>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-lg">110 mg/dL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};