"use client";

import { ReactElement, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { profileDropdownState } from "store";
import Link from "next/link";

export function Dropdown({
  userType,
  userProfileImage,
  userProfileName,
}: {
  userType: "resOwner" | "user" | undefined;
  userProfileImage: string;
  userProfileName: string;
}): ReactElement {
  const [isOpen, setIsOpen] = useRecoilState(profileDropdownState);
  const router = useRouter();
  let userName = userProfileName;
  userName = userName.split("@")[0];
  userName = userName.split(".")[0];
  userName = userName.split(" ")[0];
  userName = userName.substring(0, 10);

  return (
    <div className="w-full">
      <div
        className="flex items-center hover:cursor-pointer space-x-1"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <img
          className=" h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
          src={userProfileImage}
          alt="userprofile image"
        />
        <div>{userName}</div>
        <ChevronDownIcon
          className={`h-5 w-5 ml-2 ${
            isOpen ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute right-4 sm:right-12 2xl:right-48 mt-2 w-32 bg-white border border-violet-200 rounded-md shadow-lg hover:cursor-pointer z-10"
      >
        <div
          className="text-black flex justify-center p-1 hover:bg-violet-200"
          onClick={() => {
            setIsOpen(false);
            router.push("/profile");
          }}
        >
          Profile
        </div>
        <div
          className="text-black flex justify-center p-1 hover:bg-violet-200"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Signout
        </div>
        <Link
          href="/partner-with-us"
          className="flex sm:hidden text-black justify-center p-1 hover:bg-violet-200"
        >
          {userType === "resOwner" ? "My Restaurants" : "Add Restaurant"}
        </Link>
      </Transition>
    </div>
  );
}
