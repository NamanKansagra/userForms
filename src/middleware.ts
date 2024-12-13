import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Function to get cookie value by name
async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = cookies(); // Get cookies from the request
  return (await cookieStore).get(name)?.value; // Get the value of the specified cookie
}

export async function middleware(req: Request) {
  const currentUser = getCookie("currentUser"); // Retrieve 'currentUser' cookie
  console.log("currentUser", currentUser);
  const url = new URL(req.url); // Get the request URL

  // If there is no user in cookies, redirect to the login page
  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no user is logged in
  }

  // Restrict the user to only visit /user/profile page
  if (url.pathname !== "/user/profile" && (await currentUser)) {
    return NextResponse.redirect(new URL("/user/profile", req.url)); // Redirect to /user/profile if the user tries to visit any other page
  }

  // If the user is logged in and tries to access /user/profile, allow the request
  return NextResponse.next();
}

// Define routes to match (restrict access to all routes except /user/profile)
export const config = {
  matcher: ["/user/profile", "/"], // This ensures only the /user/profile page is accessible
};
