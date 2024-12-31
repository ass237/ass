"use client"; // Declare this as a Client Component

import React from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'

export default function Billing() {
  const router = useRouter();

  const redirectToOverview = () => {
    router.push("/user");
  };

  // Update the types of parameters
  const redirectToPayment = (plan: string, price: number) => {
    router.push(`/payment?plan=${encodeURIComponent(plan)}&price=${price}`);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="text-center py-6 bg-white bg-opacity-10 text-white">
        <h1 className="text-4xl font-semibold">Blood4All Pricing Plans</h1>
      </header>

      <div className="flex flex-col md:flex-row items-center gap-10 justify-center md:gap-5 py-10">
        {/* Basic Plan Card */}
        <div className="bg-green-100 rounded-lg shadow-lg w-72 p-5 flex flex-col justify-between hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-gray-800">Basic</h2>
          <p className="text-2xl font-semibold text-green-600">Free</p>
          <ul className="list-none text-left mt-5 mb-10">
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-green-600 font-bold mr-2">✓</span>Quick localization of blood banks
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-green-600 font-bold mr-2">✓</span>Basic donor search
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-green-600 font-bold mr-2">✓</span>Access to educational content
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-green-600 font-bold mr-2">✓</span>Basic notifications
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-green-600 font-bold mr-2">✓</span>Privacy declaration
            </li>
          </ul>
          <button
            onClick={redirectToOverview}
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg items-center hover:bg-green-700 transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Pro Plan Card */}
        <div className="bg-red-100 rounded-lg shadow-lg w-72 p-5 flex flex-col justify-between hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-gray-800">Pro</h2>
          <p className="text-2xl font-semibold text-red-600">15,000 XAF/month</p>
          <ul className="list-none text-left mt-5 mb-10">
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Advanced donor search
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Customizable geolocation radius
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Real-time tracking
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Interactive user interface
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Enhanced educational content
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Emergency alerts
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-red-600 font-bold mr-2">✓</span>Cross-platform synchronization
            </li>
          </ul>
          <button
            onClick={() => redirectToPayment("Pro", 15000)}
            className="inline-block bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Buy Now
          </button>
        </div>

        {/* Yearly Plan Card */}
        <div className="bg-blue-100 rounded-lg shadow-lg w-72 p-5 flex flex-col justify-between hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-gray-800">Yearly Subscription</h2>
          <p className="text-2xl font-semibold text-blue-600">153,000 XAF/year</p>
          <p className="text-sm text-gray-600">(15% discount compared to monthly plan)</p>
          <ul className="list-none text-left mt-5 mb-10">
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-blue-600 font-bold mr-2">✓</span>All Pro plan features
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-blue-600 font-bold mr-2">✓</span>Priority customer support
            </li>
            <li className="flex items-center mb-3 text-gray-800">
              <span className="text-blue-600 font-bold mr-2">✓</span>Special offers for donors
            </li>
          </ul>
          <button
            onClick={() => redirectToPayment("Yearly Subscription", 153000)}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
