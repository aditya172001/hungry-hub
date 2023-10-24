import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ReactElement } from "react";
import { ProfileDropdown, StepsCard } from "ui";
import Link from "next/link";

export default function PartnerWithUs(): ReactElement {
  return (
    <main>
      <div
        className=" px-48"
        style={{
          backgroundImage: `url("/partner-with-us-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "0px -110px",
        }}
      >
        <div className="flex items-center justify-between pt-4">
          <Link href={"/"} className="text-3xl font-bold font-serif">
            hungryHub
          </Link>
          <ProfileDropdown
            profileImage="/empty-profile-picture.png"
            authOptions={authOptions}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className=" text-4xl py-10">
            Partner with Hungryhub at 0% commission!
          </div>
          <div className="py-10">
            <Link
              href={"/register-restaurant"}
              className="rounded-md bg-violet-500 text-white py-4 px-12 mr-2"
            >
              Register your restaurant
            </Link>
            <Link
              href={"/restaurants"}
              className="rounded-md bg-white text-violet-500 py-4 px-8 ml-2"
            >
              View your existing restaurants
            </Link>
          </div>
          <div className="pb-8 hover:cursor-pointer">
            Need help? Please email us at imaginaryemail@imagine.com
          </div>
        </div>
      </div>
      <div
        className="px-48 py-20"
        style={{
          backgroundImage: `url("/partner-with-us-bg2.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "0px -10px",
        }}
      >
        <div className="text-4xl text-center pb-14">How it works?</div>
        <div className="flex items-center justify-between">
          <StepsCard
            image="/step1.png"
            color="orange"
            step="1"
            title="Register your restaurant"
            description="Help users discover your place by registering with us"
          />
          <StepsCard
            image="/step2.png"
            color="yellow"
            step="2"
            title="Update restaurant Menu"
            description="Make eveyone's mouth water with your tasty dishes"
          />
          <StepsCard
            image="/step3.png"
            color="red"
            step="3"
            title="Start recieving orders online"
            description="Sit back and watch your business grow"
          />
        </div>
      </div>
    </main>
  );
}
