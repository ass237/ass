import React from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";
/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper function to format the current date (YYYY/MM/DD)
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const UserCard = async ({ type }: { type: "User" | "Donor" | "Admin" | "Guest" | "Bank" | "Requests" }) => {
  const modelMap: Record<typeof type, any> = {
    User: prisma.user,
    Donor: prisma.user, // Same model for Donor, but we will filter by `isDonor`
    Admin: prisma.user,  // Same model for Admin, but we will filter by `role`
    Guest: prisma.user,  // Same model for Guest, but we will filter by `role`
    Bank: prisma.bloodBank,
    Requests: prisma.bloodRequest, // Assuming this is the model for requests
  };

  let data;

  if (type === "Donor") {
    // Counting only users who are donors (e.g., `isDonor: true`)
    data = await modelMap[type].count({
      where: {
        donorStatus: true, // Filters users who are marked as donors
      },
    });
  } else if (type === "Admin") {
    // Counting only users who are admins (e.g., `role: "ADMIN"`)
    data = await modelMap[type].count({
      where: {
        role: "ADMIN", // Filters users who have the role "ADMIN"
      },
    });
  } else if (type === "Guest") {
    // Counting only users who are guests (e.g., `role: "GUEST"`)
    data = await modelMap[type].count({
      where: {
        role: "GUEST", // Filters users who have the role "GUEST"
      },
    });
  } else if (type === "Requests") {
    // Counting only requests with `status` "pending"
    data = await modelMap[type].count({
      where: {
        status: "pending", // Filters requests with status "pending"
      },
    });
  } else {
    // For other types, count all records
    data = await modelMap[type].count();
  }

  // Get the current date dynamically
  const currentDate = formatDate(new Date());

  return (
    <div className="rounded-2xl odd:bg-blue-200 even:bg-red-400 p-4 flex-1 min-w-[130px] shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {currentDate}
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h1 className="capitalize text-sm font-medium text-gray-500">{type}</h1>
    </div>
  );
};

export default UserCard;
