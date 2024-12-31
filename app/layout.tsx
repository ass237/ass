
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
// import Footer1 from "@/components/Footer1";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Access Sang Secure",
  description: "",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  // Check if the current route is the 404 page
  // const is404Page = typeof window !== 'undefined' && window.location.pathname === '/404';

  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="bottom-right" theme="dark"/>
               
       
      </body>
    </html>
 
  );
}
