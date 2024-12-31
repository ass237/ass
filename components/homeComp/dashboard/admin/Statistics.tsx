import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  totalUsers: 1200,
  activeUsers: 900,
  newUsers: 50,
  userGrowth: 5.6,
};

const chartData = {
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    newUsers: [5, 8, 6, 10, 12, 7, 9],
    userGrowth: [0.1, 0.15, 0.12, 0.2, 0.25, 0.18, 0.22],
  },
  month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    newUsers: [30, 50, 45, 60],
    userGrowth: [1.0, 1.5, 1.2, 1.8],
  },
  year: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    newUsers: [120, 150, 130, 160, 180, 170, 190, 200, 210, 220, 230, 240],
    userGrowth: [2.5, 3.0, 2.8, 3.5, 4.0, 3.8, 4.2, 4.5, 5.0, 5.2, 5.5, 5.8],
  },
};

const StatisticItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
    <h4 className="font-medium text-gray-500">{label}</h4>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const StatisticsPage: React.FC = () => {
  const [filter, setFilter] = useState<'week' | 'month' | 'year'>('week');

  const handleFilterChange = (newFilter: 'week' | 'month' | 'year') => {
    setFilter(newFilter);
  };

  const barChartData = {
    labels: chartData[filter].labels,
    datasets: [
      {
        label: 'New Users',
        data: chartData[filter].newUsers,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
    ],
  };

  const lineChartData = {
    labels: chartData[filter].labels,
    datasets: [
      {
        label: 'User Growth (%)',
        data: chartData[filter].userGrowth,
        borderColor: 'rgba(153, 102, 255, 0.7)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Statistics Overview
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatisticItem label="Total Users" value={data.totalUsers} />
          <StatisticItem label="Active Users" value={data.activeUsers} />
          <StatisticItem label="New Users" value={data.newUsers} />
          <StatisticItem label="User Growth (%)" value={`${data.userGrowth}%`} />
        </div>
        <div className="flex-1 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Detailed Reports
          </h2>
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
            <button
              onClick={() => handleFilterChange('week')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-colors duration-300 ${
                filter === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => handleFilterChange('month')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-colors duration-300 ${
                filter === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => handleFilterChange('year')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-colors duration-300 ${
                filter === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Year
            </button>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
              New Users Over Time
            </h3>
            <div className="h-64 sm:h-80 lg:h-96">
              <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
              User Growth (%) Over Time
            </h3>
            <div className="h-64 sm:h-80 lg:h-96">
              <Line
                data={lineChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
