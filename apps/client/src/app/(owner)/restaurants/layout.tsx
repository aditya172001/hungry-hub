import { ReactElement } from "react";
import { ProfileDropdown } from "ui";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default function RestaurantOwnerLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <main className="px-48 bg-violet-50 min-h-screen">
      <div className="flex items-center justify-between pt-4">
        <Link href={"/"} className="text-3xl font-bold font-serif">
          hungryHub
        </Link>
        <ProfileDropdown
          profileImage="/empty-profile-picture.png"
          authOptions={authOptions}
        />
      </div>
      {children}
    </main>
  );
}
