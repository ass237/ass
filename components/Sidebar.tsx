"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  HeartPulse,
  MapPinned,
  Syringe,
  User,
  CalendarDays,
  Settings,
  CreditCard,
  BookCheck,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Role } from "@prisma/client";



export default function Sidebar() {
  const fetchedUser = useCurrentUser(); // Fetch user data
  const [role, setRole] = useState<Role | null>(null); // Allow null for loading state

  useEffect(() => {
    // Set role when user data is available
    if (fetchedUser?.role) {
      setRole(fetchedUser.role as Role); // Type assertion for stricter typing
    }
  }, [fetchedUser]);

  // Menu items based on roles
  const adminMenu = [
    {
      title: "MENU",
      item: [
        {
          link: role === "ADMIN" ? "/admin" : "/user",
          icon: <LayoutDashboard size={20} />,
          text: "Overview",
          visible: ["REGULAR", "ADMIN"],
        },
        {
          link: "/list/bloodMap",
          icon: <MapPinned size={20} />,
          text: "Map Search",
          visible: ["REGULAR", "ADMIN"],
        },
        {
          link: "/list/bloodRequestForm",
          icon: <HeartPulse size={20} />,
          text: "Request Blood",
          visible: ["REGULAR"],
        },
        {
          link: "/list/Billing",
          icon: <CreditCard size={20} />,
          text: "Subscription",
          visible: ["REGULAR"],
        },
        {
          link: "/list/userManager",
          icon: <User size={20} />,
          text: "User Management",
          visible: ["ADMIN"],
        },
        {
          link: "/list/bloodBankManager",
          icon: <MapPinned size={20} />,
          text: "Blood Bank Management",
          visible: ["ADMIN"],
        },
        {
          link: "/list/DonorManager",
          icon: <Syringe size={20} />,
          text: "Donor Management",
          visible: ["ADMIN"],
        },
        {
          icon: <CalendarDays size={20} />,
          link: "/list/events",
          text: "Events",
          visible: ["ADMIN"],
        },
        {
          icon: <BookCheck size={20} />,
          link: "/list/checkForm",
          text: "FormCheck",
          visible: ["ADMIN"],
        },
        {
          link: "/admin/settings",
          icon: <Settings size={20} />,
          text: "Settings",
          visible: ["ADMIN"], // Fixed here
        },
      ],
    },
  ];

  if (!role) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div className="mt-4 text-sm">
      {adminMenu.map((menu) => (
        <div className="flex flex-col gap-2" key={menu.title}>
          <span className="hidden lg:block text-gray-400 font-light px-4 my-4">{menu.title}</span>
          {menu.item.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.link}
                  key={item.text}
                  className="flex md:px-2 items-center rounded-md hover:bg-[#9ce1e3] justify-center lg:justify-start gap-4 px-2 text-gray-500 py-2"
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.text}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
