"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    CinetPay: any;
  }
}

const PaymentForm: React.FC = () => {
  const searchParams = useSearchParams();
  const price = searchParams.get("price") || "15000"; // Default to 15000 if not provided
  const subscriptionDays = 30; // Define subscription duration (in days)
  const [subscriptionCountdown, setSubscriptionCountdown] = useState<string>("");

  useEffect(() => {
    // Dynamically load the CinetPay SDK script
    const script = document.createElement("script");
    script.src = "https://cdn.cinetpay.com/seamless/main.js";
    script.async = true;

    script.onload = () => {
      console.log("CinetPay SDK loaded successfully");
    };

    script.onerror = () => {
      console.error("Failed to load CinetPay SDK");
      alert("Error loading payment SDK. Please try again later.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script on component unmount
    };
  }, []);

  const startSubscriptionCountdown = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + subscriptionDays); // Set subscription end date

    const updateCountdown = () => {
      const now = new Date();
      const remainingTime = endDate.getTime() - now.getTime();

      if (remainingTime <= 0) {
        setSubscriptionCountdown("Subscription expired!");
        return;
      }

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setSubscriptionCountdown(
        `${days}d ${hours}h ${minutes}m ${seconds}s remaining`
      );
    };

    updateCountdown(); // Initialize countdown immediately
    const intervalId = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  };

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!window.CinetPay) {
      alert("CinetPay SDK is not yet loaded. Please wait and try again.");
      console.error("CinetPay SDK is missing or not loaded.");
      return;
    }

    const transactionId = `txn_${Date.now()}`;
    const paymentData = {
      apikey: process.env.NEXT_PUBLIC_CINETPAY_API_KEY,
      site_id: process.env.NEXT_PUBLIC_CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount: parseFloat(price),
      currency: "XAF",
      channels: "ALL",
      mode: "PRODUCTION",
      description: "Blood4All Pro Plan Payment",
      notify_url: "https://mondomaine.com/notify/",
    };

    try {
      window.CinetPay.setConfig({
        apikey: paymentData.apikey,
        site_id: paymentData.site_id,
        notify_url: paymentData.notify_url,
        close_after_response: true,
      });

      window.CinetPay.getCheckout({
        ...paymentData,
        onSuccess: (response: any) => {
          console.log("Payment successful:", response);
          alert("Payment successful! You are now a VIP.");
          updateUserStatusToVIP(); // Update user status
          startSubscriptionCountdown(); // Start subscription countdown
        },
        onError: (error: any) => {
          console.error("Payment failed:", error);
          alert(`Payment failed: ${error.message || "Unknown error"}`);
        },
      });
    } catch (error: any) {
      console.error("Error initializing payment:", error);
      alert(`An error occurred during payment. Details: ${error.message || "Unknown error"}`);
    }
  };

  const updateUserStatusToVIP = () => {
    // Simulating user status update (replace with real API call)
    console.log("User status updated to VIP!");
    alert("Your status has been updated to VIP.");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center">Pay for Pro Plan</h1>
      <form onSubmit={handlePayment} className="mt-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Pay {price} XAF
        </button>
      </form>
      {subscriptionCountdown && (
        <div className="mt-6 text-center text-sm font-semibold text-green-600">
          {subscriptionCountdown}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
