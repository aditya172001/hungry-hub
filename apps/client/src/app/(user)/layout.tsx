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
    <main className="px-48 bg-violet-50 min-h-screen">
      <div className="flex items-center justify-between pt-3">
        <Link
          href={"/"}
          className="text-3xl font-bold font-serif hover:cursor-pointer"
        >
          hungryHub
        </Link>
        <SearchBar />
        <ProfileDropdown
          authOptions={authOptions}
          profileImage="/empty-profile-picture.png"
        />
      </div>
      {children}
    </main>
  );
}
