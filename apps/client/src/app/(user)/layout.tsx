import { ReactElement } from "react";
import { SearchBar, ProfileDropdown } from "ui";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <main className="px-4 sm:px-12 2xl:px-48 bg-violet-50 min-h-screen">
      <div className="flex items-center justify-between pt-3">
        <Link
          href={"/"}
          className="text-xl sm:text-3xl font-bold font-serif hover:cursor-pointer z-10"
        >
          hungryHub
        </Link>
        <ProfileDropdown
          authOptions={authOptions}
          profileImage="/empty-profile-picture.png"
        />
      </div>
      <div className="flex items-center justify-center translate-y-4 xl:-translate-y-10 w-full">
        <SearchBar />
      </div>
      {children}
    </main>
  );
}
