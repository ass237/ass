"use client"
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import  Link from "next/link";
import Image from "next/image";
import logo from "@/public/Logo.jpeg";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [userRole, setUserRole] = useState<'user' | 'donor' | 'admin'>('admin'); // Default user role

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prev) => !prev);
  // };

  return (
      <div className="flex h-screen">
              {/*left side*/}
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-gray-100 shadow-red-300">
                <Link  href='/'className="flex items-center lg:justify-start gag-2 p-4 cursor-pointer hover:bg-red-600 rounded transition-colors duration-200">
                  <Image src={logo} alt="Logo" width={30} height={30} className="mr-2" /> 
                  <span className=" hidden lg:block text-4xl font-bold text-red-800">ASS</span>
                </Link>
                <Sidebar/> 
          </div >
          {/*right side*/}
          <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll bg-[#f7f8fa] ">
            <Navbar />
            {children}
          </div>
      </div>
  );
}
