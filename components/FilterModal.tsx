import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
const FilterModal = ({
  urgencyFilter,
  setUrgencyFilter,
  roleFilter,
  setRoleFilter,
  bloodQtyFilter,
  setBloodQtyFilter,
  onClose,
}: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Filter Settings</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Urgency</label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="All">All</option>
              <option value="REGULAR">REGULAR</option>
              <option value="GUEST">GUEST</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Quantity</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={bloodQtyFilter[1]}
              onChange={(e) => setBloodQtyFilter([bloodQtyFilter[0], e.target.value])}
              className="mt-1 block w-full"
            />
            <div className="flex justify-between">
              <span>{bloodQtyFilter[0]} - {bloodQtyFilter[1]}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
