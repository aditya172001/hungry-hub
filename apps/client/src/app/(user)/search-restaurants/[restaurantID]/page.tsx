import { getSingleRestaurantData } from "./get-single-restaurant-data";
import {
  StarIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { UserRestaurantMenuItem } from "ui";
import Link from "next/link";

export default async function SingleRestaurantinfo({
  params,
}: {
  params: { restaurantID: string };
}) {
  const { restaurantID } = params;
  const restaurant = await getSingleRestaurantData(restaurantID);
  if (!restaurant) return <div>restauarnt data not available</div>;

  const {
    restaurantName,
    description,
    profilePicture,
    address,
    rating,
    openingHours,
    menu,
  } = restaurant;

  return (
    <div className="py-4">
      <img
        src={profilePicture}
        alt="restaurant profile img"
        className="w-full h-80 object-cover"
      />
      <div className="flex items-center justify-between py-2">
        <div className="text-4xl font-semibold">{restaurantName}</div>
        <div
          className={`flex items-center justify-center space-x-1 w-16 p-1 rounded-md text-white font-semibold ${
            rating >= 3.5
              ? "bg-green-600"
              : rating >= 2
              ? "bg-yellow-500"
              : rating === 0
              ? "bg-gray-400"
              : "bg-red-600"
          }`}
        >
          <div>{rating}</div>
          <StarIcon className="w-4" />
        </div>
      </div>
      <div className="text-gray-700">{description}</div>
      <div className="text-gray-500 text-sm">
        {address?.city}, {address?.street}
      </div>
      <div className="text-gray-500 text-sm">
        Open between <span className="text-gray-800">{openingHours.open}</span>{" "}
        to <span className="text-gray-800">{openingHours.close}</span>
      </div>
      <div className="flex items-center justify-between pt-3 pb-2">
        <div className="flex items-center space-x-1 text-xl text-gray-700 font-semibold">
          <ClipboardDocumentListIcon className="w-7" />
          <div>Menu</div>
        </div>
        <Link href={"/checkout"}>
          <ShoppingCartIcon className="w-7 hover:cursor-pointer text-gray-700" />
        </Link>
      </div>

      {menu ? (
        menu.map((item) => (
          <UserRestaurantMenuItem
            key={item.itemID}
            myItem={JSON.stringify(item)}
            restaurantID={restaurantID}
          />
        ))
      ) : (
        <div className="flex justify-center">No items available</div>
      )}
    </div>
  );
}
