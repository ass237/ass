"use client";

import Image from 'next/image';
import logo from '@/app/public/Logo.jpeg' // Adjust the path as necessary
import Link from 'next/link';
import {  FaUser, FaUserMd, FaUserShield, FaSignOutAlt } from 'react-icons/fa';



// Define user roles
type UserRole = 'user' | 'donor' | 'admin';

// Helper function to get the appropriate icon for a role
const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'user':
      return <FaUser className="mr-2" />;
    case 'donor':
      return <FaUserMd className="mr-2" />;
    case 'admin':
      return <FaUserShield className="mr-2" />;
    default:
      return <FaUser className="mr-2" />;
  }
};

const Navbar = () => {
 
  
  // TODO: Replace this with actual user role from your auth context or prop
  const userRole: UserRole = 'donor';

  // Function to toggle the mobile menu


  // TODO: Implement logout functionality
  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logout logic here
  };

  return (

    
      <div className="fixed  ml-[50px] md:ml-2  bg-white flex justify-between  items-center p-0 pl-[10px] shadow-md gap-9 ">
        <div className='justify-between pl-[10px] md:pl-0'>
            <Link href='/' className="flex items-center">
              <Image src={logo} alt="Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold text-red-700">ASS</span>
            </Link>
        </div>
          
          <div className="flex items-center text-gray-700 bg-white px-4 py-2 rounded-md">
            {getRoleIcon(userRole)}
            <span className="capitalize mr-3">{userRole}</span>
            <button 
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>

      </div>

  );
};

export default Navbar;
