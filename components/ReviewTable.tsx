import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
const ReviewTable = ({
  requests,
  onReview,
  currentPage,
  totalPages,
  onPageChange,
}: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Blood Type</th>
            <th className="border border-gray-300 px-4 py-2">Urgency</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Blood Qty</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req: any) => (
            <tr key={req.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{req.id}</td>
              <td className="border border-gray-300 px-4 py-2">{req.name}</td>
              <td className="border border-gray-300 px-4 py-2">{req.bloodType}</td>
              <td className="border border-gray-300 px-4 py-2">{req.urgency}</td>
              <td className="border border-gray-300 px-4 py-2">{req.userRole}</td>
              <td className="border border-gray-300 px-4 py-2">{req.bloodQty} ml</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => onReview(req)}
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewTable;
