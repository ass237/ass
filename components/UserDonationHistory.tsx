// components/DonationHistory.tsx
import React from 'react';

type Location = {
  locationId: number;
  name: string;
  address: string;
};

type Donation = {
  date: string;
  location: Location;
};

type DonationHistoryProps = {
  data: Donation[];
  limit?: number; // Optional prop to limit the number of donations displayed
};

const UserDonationHistory: React.FC<DonationHistoryProps> = ({ data, limit }) => {
  // Sort the data by date in descending order (most recent first)
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Apply the limit if provided
  const limitedData = limit ? sortedData.slice(0, limit) : sortedData;

  return (
    <div className="space-y-4 p-4">
      {limitedData.length === 0 ? (
        <p className="text-center text-gray-500">No donation history available.</p>
      ) : (
        limitedData.map((donation, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center bg-gray-100 rounded-lg p-4">
            <div className="flex-shrink-0">
              <p className="text-white text-sm bg-red-500 pl-4 md:pr-4">{donation.date}</p>
            </div>
            <div className="p-0 md:pl-4">
              <h4 className="text-xl font-medium">{donation.location.name}</h4>
              <p className="text-sm text-gray-500">{donation.location.address}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDonationHistory;
