import React from 'react';

export const FamilyDashboard = ({ user }: { user: any }) => {
  const elders = [
    {
      id: '1',
      name: 'Mary Johnson',
      riskLevel: 'MEDIUM' as const,
      hasRecentFallHistory: true,
      recentHospitalization: false,
      openSOS: false,
      lastCheckIn: '2 hours ago',
    },
    {
      id: '2', 
      name: 'Robert Smith',
      riskLevel: 'LOW' as const,
      hasRecentFallHistory: false,
      recentHospitalization: true,
      openSOS: true,
      lastCheckIn: '5 minutes ago',
    },
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewElderDetails = (elderId: string) => {
    alert(`View details for elder ${elderId}`);
    // TODO: Navigate to elder details page
  };

  const respondToSOS = (elderId: string) => {
    alert(`Responding to SOS for elder ${elderId}`);
    // TODO: Implement SOS response
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Family Dashboard</h1>
        <p className="text-gray-600">Monitoring your loved ones' safety and health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elders.map((elder) => (
          <div key={elder.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{elder.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(elder.riskLevel)}`}>
                    {elder.riskLevel} Risk
                  </span>
                </div>
                {elder.openSOS && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🚨 SOS
                  </span>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-3">
                {/* Status Flags */}
                <div className="flex flex-wrap gap-2">
                  {elder.hasRecentFallHistory && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      Recent Fall
                    </span>
                  )}
                  {elder.recentHospitalization && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      Recent Hospitalization
                    </span>
                  )}
                </div>

                {/* Last Check-in */}
                <div className="text-sm text-gray-600">
                  Last check-in: {elder.lastCheckIn}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => viewElderDetails(elder.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex-1"
                  >
                    View Details
                  </button>
                  {elder.openSOS && (
                    <button 
                      onClick={() => respondToSOS(elder.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Respond to SOS
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Elder Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold mb-2">Add Another Elder to Monitor</h3>
          <p className="text-gray-600 mb-4">Invite another family member to join KinGuardian</p>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
            + Add Elder
          </button>
        </div>
      </div>
    </div>
  );
};