import type { ReactElement } from "react";
import { MyAccordian } from "./accordian";
import { Restaurant, Item, ensureDbConnection } from "db";
import { itemPostType, restauantType } from "validation";

export async function ExploreOptions(): Promise<ReactElement> {
  await ensureDbConnection();

  //get all the restaurant names
  const rawRestaurants: restauantType[] =
    await Restaurant.find().populate("address");
  const restaurnts = rawRestaurants
    .map((restaurant) => restaurant.restaurantName)
    .slice(0, 6);

  //get all the cities we are available in
  const rawCities: string[] = rawRestaurants.map(
    (restaurant) => restaurant.address.city
  );
  const distinctCities = [
    ...new Set(
      rawCities.map((city) =>
        city
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
    ),
  ].slice(0, 6);

  //get 6 dishes
  const rawDishes = await Item.find();
  const dishes: string[] = rawDishes
    .map((dish: itemPostType) => dish.itemName)
    .slice(0, 6);

  return (
    <div className="px-48 py-10 space-y-4">
      <div className="text-2xl">Explore options near me</div>
      <MyAccordian title="Popular cuisines near me" contents={dishes} />
      <MyAccordian title="Popular restaurants near me" contents={restaurnts} />
      <MyAccordian title="Cities We Deliver To" contents={distinctCities} />
    </div>
  );
}
