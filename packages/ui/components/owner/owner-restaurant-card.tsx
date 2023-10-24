import { ReactElement } from "react";
import Link from "next/link";
import { ViewStarRating } from "./view-star-rating";
import { RestaurantInfoType } from "types";

export function OwnerRestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantInfoType;
}): ReactElement {
  const { restaurantID, restaurantName, description, profilePicture, rating } =
    restaurant;
  return (
    <Link
      href={`/restaurants/${restaurantID}`}
      className="bg-white flex flex-col items-center rounded-md w-80 h-96 p-10 m-6"
    >
      <img
        src={profilePicture}
        alt="step1 image"
        className={`h-44 w-52 object-cover rounded-md`}
      />
      <div className="py-2">
        <ViewStarRating rating={rating} />
      </div>
      <div className="text-xl text-center">{restaurantName}</div>
      <div className=" text-sm py-2 text text-slate-600 text-center">
        {description}
      </div>
    </Link>
  );
}
