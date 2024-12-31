"use client";
import Image from 'next/image';
import logo from '@/public/Logo.jpeg'; // Adjust the path as necessary
import Link from 'next/link';
import { Home, MapPin, Book, LogIn } from 'lucide-react'; // Import Lucid icons

// Define the type for a navigation link
type NavbarLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

// Create an array of NavbarLink objects with icons
const navItems: NavbarLink[] = [
  { label: 'Home', href: '/', icon: <Home /> },
  { label: 'Blood Map', href: '/bloodMap', icon: <MapPin /> },
  { label: 'Education', href: '/education', icon: <Book /> },
  { label: 'Sign In', href: '/sign-in', icon: <LogIn /> },
];

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-red-700">ASS</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="flex space-x-6">
          {navItems.map(({ label, href, icon }) => (
            <Link 
              href={href} 
              key={label} 
              className="nav-item hover:bg-red-700 hover:text-white h-full transition-colors px-4 py-3 rounded-none flex items-center"
            >
              <div className="text-3xl">{icon}</div> {/* Increased icon size */}
              <span className="ml-2 hidden sm:inline">{label}</span> {/* Hide text on mobile */}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
