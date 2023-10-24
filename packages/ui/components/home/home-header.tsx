import type { ReactElement } from "react";
import { HomeAppbar } from "./home-appbar";
import { SearchBar } from "./searchbar";
import { NextAuthOptions } from "next-auth";

export function HomeHeader({
  authOptions,
  profileImage,
}: {
  authOptions: NextAuthOptions;
  profileImage: string;
}): ReactElement {
  return (
    <div
      className="text-white bg-cover bg-center px-48"
      style={{
        backgroundImage: `url(/dash_img.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "0px -10px",
        width: "100vw",
        height: "560px",
      }}
    >
      <HomeAppbar authOptions={authOptions} profileImage={profileImage} />
      <div className="flex flex-col items-center pt-24">
        <div className="text-7xl font-bold font-serif">hungryHub</div>
        <div className="text-4xl font-semibold font-sans pt-6">
          Discover the best food & drinks
        </div>
        <div className="p-8">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
