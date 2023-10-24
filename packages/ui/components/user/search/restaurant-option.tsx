"use client";
import { restaurantOptionType } from "validation";
import Image from "next/image";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentRestaurantOptionState, initiateSearchState } from "store";

export function RestaurantOption({
  restaurantOption,
  activeIcon,
  inactiveIcon,
  bgActiveColor,
  bgInactiveColor,
  text,
}: {
  restaurantOption: restaurantOptionType;
  activeIcon: string;
  inactiveIcon: string;
  bgActiveColor: string;
  bgInactiveColor: string;
  text: string;
}) {
  //restaurantOption is all the 3 types of restaurants available it order-online,dine-out,night-life and currentRestaurantOption is the one selected for current search
  const [currentRestaurantOption, setCurrentRestaurantOption] = useRecoilState(
    currentRestaurantOptionState
  );
  const setInitiateSearch = useSetRecoilState(initiateSearchState);
  return (
    <div
      onClick={() => {
        setCurrentRestaurantOption(restaurantOption);
        setInitiateSearch(true);
      }}
    >
      {restaurantOption === currentRestaurantOption ? (
        <div className="flex items-center space-x-2 p-4 pt-6 text-lg font-semibold text-violet-500 border-b-2 border-violet-500 transition-all duration-200">
          <div
            className={` flex items-center justify-center rounded-full h-16 w-16 ${bgActiveColor}`}
          >
            <Image
              src={activeIcon}
              height={100}
              width={100}
              alt="restaurant option icon"
              className=" h-8 w-8"
            />
          </div>

          <div>{text}</div>
        </div>
      ) : (
        <div className="flex items-center space-x-2 p-4 pt-6 text-lg font-semibold text-gray-700 transition-all duration-200">
          <div
            className={` flex items-center justify-center rounded-full h-16 w-16 ${bgInactiveColor}`}
          >
            <Image
              src={inactiveIcon}
              height={100}
              width={100}
              alt="restaurant option icon"
              className=" h-8 w-8"
            />
          </div>

          <div>{text}</div>
        </div>
      )}
    </div>
  );
}
