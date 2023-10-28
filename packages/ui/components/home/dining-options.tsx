"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cityState,
  currentRestaurantOptionState,
  initiateSearchState,
} from "store";
import { useRouter } from "next/navigation";

export function DiningOption({
  image,
  mode,
  description,
}: {
  image: string;
  mode: string;
  description: string;
}): ReactElement {
  const city = useRecoilValue(cityState);
  const setCurrentRestaurantOption = useSetRecoilState(
    currentRestaurantOptionState
  );
  const setInitiateSearch = useSetRecoilState(initiateSearchState);
  const router = useRouter();
  function handleClick() {
    console.log(city);
    if (city === "") {
      return window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (mode === "Online Order") {
      setCurrentRestaurantOption("order-online");
    } else if (mode === "Dining") {
      setCurrentRestaurantOption("dine-out");
    } else if (mode === "Night Life") {
      setCurrentRestaurantOption("night-life");
    }
    setInitiateSearch(true);
    router.push("/search-restaurants");
  }

  return (
    <div
      className="bg-purple-50 rounded-md transition-transform duration-300 hover:scale-110"
      onClick={handleClick}
    >
      <Image
        src={image}
        width={500}
        height={500}
        alt="online/offline img"
        className="h-48 w-96 rounded-t-md object-cover"
      />
      <div className="border border-violet-200 rounded-b-md p-3">
        <div className="font-semibold">{mode}</div>
        <div className="font-light">{description}</div>
      </div>
    </div>
  );
}
