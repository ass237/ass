"use client";

import { z } from "zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import { DEFAULT_REDIRECT } from "@/routes";

export default function SignInPage() {
  // Define the schema for validation
  const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
  });

  // Initialize the form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  // State to track loading status
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading,setisGoogleLoading] = useState(false);

  // Submit handler for the form
  const onSubmit = async (data: { email: string }) => {
    setLoading(true); // Start loading
    try {

      signIn(
        "resend",
        {email:data.email,
          callbackUrl: DEFAULT_REDIRECT
        }
      )
    } catch (error) {
        console.error(error)
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const onclick = async (provider: 'google'|'github')=>{
    signIn(
      provider,
      {callbackUrl: DEFAULT_REDIRECT}
    )
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 md:px-8 md:py-24 flex items-center">
        <div className="mx-auto w-full max-w-lg px-4 py-6 md:py-12 lg:px-0">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 sm:text-3xl">Welcome Back!</h1>
            <p className="mt-4 text-gray-700">Sign in to your account to continue.</p>
          </div>
          {/* Sign-In Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 max-w-[300px] space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled={loading} // Disable input when loading
                {...register("email")}
                className={`w-full rounded-lg border px-4 py-3 text-sm${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || isGoogleLoading} // Disable button when loading
              className={`w-full rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in with Email"}
            </button>
          </form>
          
            <div className="w-full items-center px-5 py-3 pl-[100px] flex">
              <div className="h-[1px] w-[115px] border border-black " />
              <span className="items center p-4"> OR </span>
              <div className="h-[1px] w-[115px] border border-black" />
            </div>
            <div className="mt-4 text-center">
            <button
              type="submit"
              onClick={() => {
                setisGoogleLoading(true);
                onclick('google');
                signIn("google", { callbackUrl: "/dashboard" }).finally(() => {
                  setisGoogleLoading(false); // Corrected the state variable here
                });
              }}
              disabled={isGoogleLoading || loading} // Disable button when either loading
              className={`w-[300px] rounded-lg px-5 py-3 text-sm font-medium transition-colors ${isGoogleLoading || loading
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {isGoogleLoading ?  
                  <Loader2 className="w-5 h-5 animate-spin" /> : 
                  <div className= "flex items center justify-center ">
                    <Image src={"/google.png"} alt="" width={20} height={20} />
                    <span className="px-2">Sign in with Google</span>
                  </div>}
            </button>

          </div>
        </div>
      </div>
      {/* Right side: Image */}
      <div className="relative h-64 w-full md:h-full md:w-1/2">
        <Image
          src="/bd1.jpeg"
          layout="fill"
          objectFit="cover"
          alt="Blood donation banner"
          className="w-full h-full md:h-[650px]"
        />
      </div>
    </div>
  );
}
