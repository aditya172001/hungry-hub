"use client";

import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cityState,
  currentRestaurantOptionState,
  initiateSearchState,
  searchState,
  userRestaurantBodyDataState,
} from "store";
import { restaurantOptionType } from "validation";
import { UserRestaurantCard } from "./user-restaurant-card";
import { useEffect, useState } from "react";
import Image from "next/image";

export function RestaurantSearchBody({ spinner }: { spinner: string }) {
  const initiateSearch = useRecoilValue(initiateSearchState);
  const city = useRecoilValue(cityState);
  const search = useRecoilValue(searchState);
  const currentRestaurantOption = useRecoilValue(
    currentRestaurantOptionState
  ) as restaurantOptionType;
  const [userRestaurantBodyData, setUserRestaurantBodyData] = useRecoilState(
    userRestaurantBodyDataState
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getdata() {
      setIsLoading(true);
      try {
        const response = await axios.get("api/restaurants", {
          headers: { city, search, restaurantOption: currentRestaurantOption },
        });
        setUserRestaurantBodyData(response.data.restaurants);
      } catch (error) {
        setUserRestaurantBodyData(undefined);
        //make a toast error
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (initiateSearch) getdata();
  }, [initiateSearch, currentRestaurantOption]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Image
          src={spinner}
          height={100}
          width={100}
          alt="spinner"
          className=" w-16"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-around py-5">
      {userRestaurantBodyData
        ? userRestaurantBodyData.map((restaurant) => (
            <UserRestaurantCard
              key={restaurant.restaurantID}
              restaurant={restaurant}
            />
          ))
        : "No restaurants available"}
    </div>
  );
}
