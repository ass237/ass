import React from 'react';

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-200">
      <h3 className="font-semibold mb-2 text-gray-800">Recent Activity</h3>
      <p className="text-gray-600">Some recent activity content here.</p>
    </div>
  );
};

export default RecentActivity;
