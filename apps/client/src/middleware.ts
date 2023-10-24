export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/register-restaurant",
    "/restaurants",
    "/restaurants/:path*",
    "/checkout",
    "/profile",
    "/profile/update",
  ],
};
