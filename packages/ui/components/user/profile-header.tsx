import { ReactElement } from "react";
import Link from "next/link";

export function ProfileHeader({
  profileImage,
  profileName,
  isButtonPresent,
  buttonText,
  buttonLink,
  bgImageLink,
}: {
  profileImage: string;
  profileName: string;
  isButtonPresent: boolean;
  buttonText: string;
  buttonLink: string;
  bgImageLink: string;
}): ReactElement {
  return (
    <div
      className="bg-cover bg-center h-52 mt-8 xl:mt-3 flex items-center justify-between px-5 text-white"
      style={{ backgroundImage: `url(${bgImageLink})` }}
    >
      <div className="flex items-center space-x-2 ">
        <img
          src={profileImage}
          alt="user profile image"
          className="rounded-full h-28 sm:h-32 w-28 sm:w-32 border-white border-4 bg-violet-50"
        />
        <div className="hidden sm:block font-semibold text-lg">
          {profileName}
        </div>
      </div>
      {isButtonPresent ? (
        <Link href={buttonLink} className="bg-violet-950 rounded-md px-3 py-1">
          {buttonText}
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
