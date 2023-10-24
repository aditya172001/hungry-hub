"use client";

import { ReactElement, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Dropdown({
  userProfileImage,
  userProfileName,
}: {
  userProfileImage: string;
  userProfileName: string;
}): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  let userName = userProfileName;
  userName = userName.split("@")[0];
  userName = userName.split(".")[0];
  userName = userName.split(" ")[0];
  userName = userName.substring(0, 10);

  return (
    <div className=" min-w-20">
      <div
        className="flex items-center hover:cursor-pointer space-x-1"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <img
          className="h-10 rounded-full"
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
        className="absolute right-48 mt-2 w-32 bg-white border border-violet-200 rounded-md shadow-lg hover:cursor-pointer"
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
      </Transition>
    </div>
  );
}
