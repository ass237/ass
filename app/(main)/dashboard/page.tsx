"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_REDIRECT_1, DEFAULT_REDIRECT_2 } from "@/routes";
import { Role } from "@prisma/client";



interface User {
  name?: string | null; // Allow optional or null values
  email: string;
}

export default function Dashboard() {
  const fetchedUser: (User & { role: string; email: string; id: string }) | undefined = useCurrentUser(); // Allow undefined
  const [user, setUser] = useState<(User & { role: Role }) | null>(null); // Accept both User and null
  const router = useRouter();

  // Update local state once the fetched user is available
  useEffect(() => {
    if (fetchedUser) {
      console.log("Fetched user:", fetchedUser); // Log user only once

      // Map Prisma's role to the local Role type
      const roleMapping: Record<string, Role> = {
        ADMIN: "ADMIN",
        REGULAR: "REGULAR",
        GUEST: "GUEST",
        VIP: "VIP",
      };

      const userWithDefaults = {
        ...fetchedUser,
        name: fetchedUser.name ?? "Unknown", // Provide a default name
        role: roleMapping[fetchedUser.role] ?? "guest", // Map role with fallback to "guest"
      };

      setUser(userWithDefaults); // Update state with default values
    }
  }, [fetchedUser]);

  if (!user) return <h1 className="items-center justify-center">Loading...</h1>; // Fallback UI during loading

  // Redirect based on role
  if (user.role === "REGULAR"||"VIP") {
    router.push(DEFAULT_REDIRECT_1);
    return null; // Prevent further rendering during redirect
  }
  if (user.role === "ADMIN") {
    router.push(DEFAULT_REDIRECT_2);
    return null; // Prevent further rendering during redirect
  }

  return <div></div>;
}
