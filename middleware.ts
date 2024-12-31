import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_REDIRECT,
  publicRoutes,
  adminRoutes,
  userRoutes,
  premiumRoutes,
} from "./routes";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";

interface user {
  id: string;
  email: string;
  role: Role;
}

const { auth } = NextAuth(authConfig);

export default auth(async(req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Check if the user is authenticated
  const user = await currentUser; // Retrieve current user details
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const userRole = user?.role as Role

  // Skip middleware for API authentication prefix
  if (isApiAuthRoute) {
    return;
  }

  // Handle authentication routes (e.g., /sign-in, /register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return; // Allow access to auth routes for unauthenticated users
  }

  // Redirect unauthenticated users from protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  // Role-based access control
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isUserRoute = userRoutes.includes(nextUrl.pathname);
  const isVipRoute = premiumRoutes.includes(nextUrl.pathname);

//   if (isAdminRoute) {
//     if (userRole !== "ADMIN") {
//       return Response.redirect(new URL("/403", nextUrl)); // Redirect unauthorized users to 403 page
//     }
//   }

//   if (isUserRoute) {
//     if (userRole !== "REGULAR" && userRole !== "VIP") {
//       return Response.redirect(new URL("/403", nextUrl));
//     }
//   }

//   if (isVipRoute) {
//     if (userRole !== "VIP") {
//       return Response.redirect(new URL("/list/Billing", nextUrl)); // Redirect to upgrade page for non-VIP users
//     }
//   }

//   // If no redirection is triggered, allow the request to proceed
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
