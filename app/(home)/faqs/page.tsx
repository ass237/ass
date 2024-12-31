// pages/faqs.tsx

"use client";

import FAQ from "@/components/homeComp/FAQ";
import Navbar from "@/components/homeComp/Navbar";
import Footer from "@/components/homeComp/Footer";
import { faqs } from "@/lib/homeData"; // Import your FAQ data

const FaqsPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        

        <FAQ faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
};

export default FaqsPage;
