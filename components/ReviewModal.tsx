import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
const ReviewModal = ({
  request,
  note,
  setNote,
  onApprove,
  onReject,
  onClose,
}: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Review Request</h2>
        <div className="space-y-4">
        
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Phone:</strong> {request.phone}</p>
          <p><strong>Sex:</strong> {request.sex}</p>
          <p><strong>Age:</strong> {request.age}</p>
          <p><strong>Address:</strong> {request.address}</p>
          <p><strong>Blood Type:</strong> {request.bloodType}</p>
          <p><strong>Urgency:</strong> {request.urgency}</p>
          <p><strong>Role:</strong> {request.role}</p>
          <p><strong>Blood Quantity:</strong> {request.bloodQty} ml</p>
          
  
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
            placeholder="Add a note (optional)"
          ></textarea>

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={onApprove}
            >
              Accept
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={onReject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
