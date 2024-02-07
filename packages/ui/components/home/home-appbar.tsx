import { ReactElement } from "react";
import { ProfileDropdown } from "../user";
import { NextAuthOptions, getServerSession } from "next-auth";
import { validateUserSession } from "../../../../apps/client/src/app/api/validateUserSession";

import Link from "next/link";

export async function HomeAppbar({
  authOptions,
  profileImage,
}: {
  authOptions: NextAuthOptions;
  profileImage: string;
}): Promise<ReactElement> {
  const session = await getServerSession(authOptions);
  const myUser = await validateUserSession(session);
  return (
    <div className="grid grid-cols-6 gap-2 py-5 items-center">
      <div className="col-span-4" />
      <Link
        href="/partner-with-us"
        className="hidden sm:block py-2 pr-10 focus:outline-none"
      >
        {myUser?.userType === "resOwner" ? "My Restaurants" : "Add Restaurant"}
      </Link>
      <div className="flex justify-end col-span-2 sm:col-span-1">
        <ProfileDropdown
          authOptions={authOptions}
          profileImage={profileImage}
        />
      </div>
    </div>
  );
}
