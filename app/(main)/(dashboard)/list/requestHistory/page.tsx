"use client";

import React, { useState, useEffect } from "react";
import { Filter, CheckCircle } from "lucide-react";
import ReviewModal from "@/components/ReviewModal";
import FilterModal from "@/components/FilterModal";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { BloodRequest } from "@prisma/client";

const AdminReviewTable = () => {
  const [data, setData] = useState<BloodRequest[]>([]); // Specify that it's an array of BloodRequest
  const [filterVisible, setFilterVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null); // Explicit type for selectedRequest
  const [note, setNote] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [bloodQtyFilter, setBloodQtyFilter] = useState([0, 1000]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = ITEM_PER_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blood-requests", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const requests = await response.json();
        setData(requests.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle status update
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/blood-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, note }),
      });

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      // Update local data after the status change
      setData((prevData) => prevData.filter((request) => request.id !== id));
      setReviewVisible(false); // Close the modal
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter the data
  const filteredData = data.filter((request) => {
    const [minQty, maxQty] = bloodQtyFilter;
    return (
      (urgencyFilter === "All" || request.urgency === urgencyFilter) &&
      (roleFilter === "All" || request.role === roleFilter) &&
      request.bloodQty >= minQty &&
      request.bloodQty <= maxQty
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReviewClick = (request: BloodRequest) => { // Explicitly type 'request'
    setSelectedRequest(request);
    setReviewVisible(true);
  };

  const handlePageChange = (page: number) => { // Type 'page' as number
    setCurrentPage(page < 1 ? 1 : page > totalPages ? totalPages : page);
  };

  return (
    <div>
      <button
        onClick={() => setFilterVisible(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center space-x-2"
      >
        <Filter size={20} />
        <span>Filter Requests</span>
      </button>

      <table className="min-w-full mt-4 table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2 hidden sm:table-cell">Email</th>
            <th className="px-4 py-2 hidden md:table-cell">Address</th>
            <th className="px-4 py-2 hidden lg:table-cell">Blood Type</th>
            <th className="px-4 py-2 hidden xl:table-cell">Sex</th>
            <th className="px-4 py-2 hidden 2xl:table-cell">Age</th>
            <th className="px-4 py-2">Blood Quantity</th>
            <th className="px-4 py-2 hidden sm:table-cell">Urgency</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((request: BloodRequest, index: number) => ( // Explicitly type 'request' and 'index'
            <tr
              key={request.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
            >
              <td className="px-4 py-2">{request.name}</td>
              <td className="px-4 py-2 hidden sm:table-cell">{request.email}</td>
              <td className="px-4 py-2 hidden md:table-cell">{request.address}</td>
              <td className="px-4 py-2 hidden lg:table-cell">{request.bloodType}</td>
              <td className="px-4 py-2 hidden xl:table-cell">{request.sex}</td>
              <td className="px-4 py-2 hidden 2xl:table-cell">{request.age}</td>
              <td className="px-4 py-2">{request.bloodQty}</td>
              <td className="px-4 py-2 hidden sm:table-cell">{request.urgency}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleReviewClick(request)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Review</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-blue-100 text-black rounded-md">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      {filterVisible && (
        <FilterModal
          urgencyFilter={urgencyFilter}
          setUrgencyFilter={setUrgencyFilter}
          bloodQtyFilter={bloodQtyFilter}
          setBloodQtyFilter={setBloodQtyFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          onClose={() => setFilterVisible(false)}
        />
      )}

      {reviewVisible && selectedRequest && (
        <ReviewModal
          request={selectedRequest}
          note={note}
          setNote={setNote}
          onApprove={() => handleUpdateStatus(selectedRequest.id, "approved")}
          onReject={() => handleUpdateStatus(selectedRequest.id, "rejected")}
          onClose={() => setReviewVisible(false)}
        />
      )}
    </div>
  );
};

export default AdminReviewTable;
