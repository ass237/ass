import React from "react";

type BloodRequest = {
  name: string;
  email: string;
  date: string;
  status: string;
  bloodQty: number;
  bloodType: string;
  note?: string;
};

interface UserRequestsHistoryProps {
  data: BloodRequest[];
  limit?: number;
}

const UserRequestsHistory: React.FC<UserRequestsHistoryProps> = ({ data, limit }) => {
  // Sort the data by date in descending order (most recent first)
  const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Apply the limit if provided
  const limitedData = limit ? sortedData.slice(0, limit) : sortedData;

  // Function to get the class based on status
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "text-white bg-green-500";
      case "rejected":
        return "text-white bg-red-500";
      case "pending":
        return "text-white bg-orange-500";
      default:
        return "text-gray-500 bg-gray-200";
    }
  };

  return (
    <div className="space-y-4 p-4">
      {limitedData.length === 0 ? (
        <p className="text-center text-gray-500">No request history available.</p>
      ) : (
        limitedData.map((request, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center bg-gray-100 rounded-lg p-4"
          >
            <div className="flex-shrink-0">
              <p
                className={`px-4 py-1 rounded-md text-sm ${getStatusClass(request.status)}`}
              >
                {request.status}
              </p>
            </div>
            <div className="p-0 md:pl-4">
              <h4 className="text-xl font-medium">{request.name}</h4>
              <p className="text-sm text-gray-500">Email: {request.email}</p>
              <p className="text-sm text-blue-500">Date: {request.date}</p>
              <p className="text-sm text-gray-500">Quantity: {request.bloodQty} ml</p>
              <p className="text-sm text-gray-500">Blood Type: {request.bloodType}</p>
              {(request.status === "accepted" || request.status === "rejected") && request.note && (
                <p className="text-sm text-gray-500">Note: {request.note}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserRequestsHistory;
