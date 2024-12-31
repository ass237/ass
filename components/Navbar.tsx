import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Dropdown from './UserItems';
import { useCurrentUser } from '@/hooks/use-current-user';
import logout from '@/lib/logout';
import Router from 'next/router';
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';
import UserForm from './forms/UserForm2';



interface UserData {
  id: string;  // Assuming user ID is a string for simplicity
  name: string;
  role: Role;
  avatar: string;
}

const defaultUser: UserData = {
  id: "",
  name: 'Loading...',
  role: 'REGULAR',
  avatar: '/avatar.png',
};

export default function Navbar() {
  const fetchedUser = useCurrentUser();
  const [user, setUser] = useState<UserData>(defaultUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  const router =useRouter()
  useEffect(() => {
    if (fetchedUser) {
      setUser({
        id: fetchedUser.id || "",
        name: fetchedUser.name || "Anonymous",
        role: (fetchedUser.role || "REGULAR") as Role,
        avatar: fetchedUser.image || "/avatar.png",
      });
    }
  }, [fetchedUser]);
  

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(defaultUser); // Reset to default state after logout
      closeDropdown();
      Router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const dropdownOptions = [
    { label: 'Update Profile', onClick: openFormModal },
    { label: 'Privacy Policy', onClick: () => router.push('/privacy-policy') },
    { label: 'About', onClick: () => router.push('/about') },
    { label: 'Terms of Service', onClick: () => router.push('/terms-of-Service') },
    { label: 'Logout', onClick: handleLogout },
  ];

  return (
  <>
    <nav className="flex items-center justify-between p-4 relative">
      <div className="flex items-center gap-6 w-full justify-end">
        {/* User Info */}
        <div className="flex flex-col text-right">
          <span className="text-xs leading-3 font-medium">{user.name}</span>
          <span className="text-[10px] text-gray-500 capitalize">{user.role}</span>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative">
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          <Dropdown isOpen={dropdownOpen} options={dropdownOptions} onClose={closeDropdown} />
        </div>
      </div>
    </nav>
    {isFormModalOpen && (
      <UserForm
        id={user.id}
        onClose={closeFormModal}
        open={isFormModalOpen} 
      />)}
  </>
    
  );
}
