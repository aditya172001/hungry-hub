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
import { useEffect } from "react";

export function RestaurantSearchBody() {
  const initiateSearch = useRecoilValue(initiateSearchState);
  const city = useRecoilValue(cityState);
  const search = useRecoilValue(searchState);
  const currentRestaurantOption = useRecoilValue(
    currentRestaurantOptionState
  ) as restaurantOptionType;
  const [userRestaurantBodyData, setUserRestaurantBodyData] = useRecoilState(
    userRestaurantBodyDataState
  );

  useEffect(() => {
    async function getdata() {
      try {
        const response = await axios.get("api/restaurants", {
          headers: { city, search, restaurantOption: currentRestaurantOption },
        });
        setUserRestaurantBodyData(response.data.restaurants);
      } catch (error) {
        setUserRestaurantBodyData(undefined);
        //make a toast error
        console.error(error);
      }
    }
    if (initiateSearch) getdata();
  }, [initiateSearch, currentRestaurantOption]);

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
