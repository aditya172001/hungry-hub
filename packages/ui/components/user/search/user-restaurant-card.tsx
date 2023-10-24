import { UserRestaurantBodyType } from "types";
import { StarIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export function UserRestaurantCard({
  restaurant,
}: {
  restaurant: UserRestaurantBodyType;
}) {
  const router = useRouter();
  const {
    restaurantID,
    restaurantName,
    description,
    profilePicture,
    rating,
    avgPrice,
  } = restaurant;
  return (
    <div
      className="border border-transparent rounded-lg hover:border-gray-300 hover:shadow-md"
      onClick={() => {
        router.push(`/search-restaurants/${restaurantID}`);
      }}
    >
      <div className="p-2">
        <img
          src={profilePicture}
          alt="profile picture"
          className=" h-60 w-80 object-cover rounded-lg"
        />
        <div className="flex items-center justify-between py-1">
          <div className=" font-semibold">
            {restaurantName.slice(0, 25)}
            {restaurantName.length >= 25 ? "..." : ""}
          </div>
          <div
            className={`flex items-center justify-center space-x-1 w-12 text-white text-sm px-1 rounded-md ${
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
            <StarIcon className="w-3" />
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-600 font-light text-sm">
          <div>
            {description.slice(0, 25)}
            {description.length >= 25 ? "..." : ""}
          </div>
          <div>{avgPrice !== 0 ? `₹${avgPrice} for one` : ""}</div>
        </div>
      </div>
    </div>
  );
}
