import type { ReactElement } from "react";
import { MyAccordian } from "./accordian";
import { Restaurant, Item, ensureDbConnection } from "db";
import { itemPostType, restauantType } from "validation";

export async function ExploreOptions(): Promise<ReactElement> {
  await ensureDbConnection();

  //get all the restaurant data
  const rawRestaurants: restauantType[] =
    await Restaurant.find().populate("address");

  //get all the restaurant names
  const restaurnts = rawRestaurants
    .map((restaurant) => restaurant.restaurantName)
    .slice(0, 6);

  //get all the cities we are available in and display only 6
  const rawCities: string[] = rawRestaurants.map(
    (restaurant) => restaurant.address.city
  );
  const distinctCities = rawCities
    .map((city) =>
      city
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .reduce((uniqueCities: string[], city) => {
      if (!uniqueCities.includes(city)) {
        uniqueCities.push(city);
      }
      return uniqueCities;
    }, [])
    .slice(0, 6);

  //get 6 dishes
  const rawDishes = await Item.find();
  const dishes: string[] = rawDishes
    .map((dish: itemPostType) => dish.itemName)
    .slice(0, 6);

  return (
    <div className="px-4 sm:px-12 2xl:px-48 py-10 space-y-4">
      <div className="text-2xl">Explore options</div>
      <MyAccordian title="Popular cuisines" contents={dishes} />
      <MyAccordian title="Popular restaurants" contents={restaurnts} />
      <MyAccordian title="Cities we deliver to" contents={distinctCities} />
    </div>
  );
}
