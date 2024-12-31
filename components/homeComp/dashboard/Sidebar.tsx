// Sidebar.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import UserItem from './Useritem';
import {
  User,
  LayoutDashboard,
  HeartPulse,
  MapPinned,
  Syringe,
  Inbox,
  Bell,
  Cookie,
  ScanEye,
  Settings,
  Menu,
  X,
} from "lucide-react"

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuList = [
        {
            group: "General",
            items: [
                { link: "/dash-board", icon: <LayoutDashboard size={20} />, text: "Dashboard" },
                { link: "/", icon: <User size={20} />, text: "Profile" },
                { link: "/", icon: <MapPinned size={20} />, text: "Map search" },
                { link: "/", icon: <HeartPulse size={20} />, text: "Request Blood" },
                { link: "/", icon: <Syringe size={20} />, text: "Become a Donor" },
                { link: "/", icon: <Inbox size={20} />, text: "Inbox" },
                { link: "/", icon: <Bell size={20} />, text: "Notification" }
            ]
        }, 
        {
            group: "Setting",
            items: [
                { link: "/", icon: <Settings size={20} />, text: "General Setting" },
                { link: "/", icon: <Cookie size={20} />, text: "Privacy" },
                { link: "/", icon: <ScanEye size={20} />, text: "Logs" }
            ]
        }
    ]

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className='fixed min-h-full '>
            {/* Mobile menu button */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-gray-300 transition-transform duration-300 ease-in-out
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                <div className="flex flex-col h-full p-5">
                    <div className="mb-4">
                        <UserItem />
                    </div>
                    <div className='flex-grow overflow-y-auto'>   
                        {menuList.map((menu, key) => (
                            <ul key={key} className='flex flex-col gap-2 p-4 list-none'>
                                <li className="font-semibold text-gray-700">{menu.group}</li>
                                {menu.items.map((option, optionKey) => (
                                    <li key={optionKey}>
                                        <Link href={option.link} className='flex items-center gap-2 p-2 cursor-pointer hover:bg-red-500 rounded transition-colors duration-200'>
                                            {option.icon}
                                            <span className="text-sm">{option.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
