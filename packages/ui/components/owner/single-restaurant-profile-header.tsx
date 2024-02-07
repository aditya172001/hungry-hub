import { ReactElement } from "react";
import Link from "next/link";
import { addressType, openingHoursType } from "validation";
import { ViewStarRating } from "./view-star-rating";

export function SingleRestaurantProfileHeader({
  bgImageLink,
  profilePicture,
  restaurantName,
  description,
  rating,
  address,
  openingHours,
  dining,
  nightlife,
  buttonText,
  buttonLink,
}: {
  bgImageLink: string;
  profilePicture: string;
  restaurantName: string;
  description: string;
  rating: number;
  address: addressType;
  openingHours: openingHoursType;
  dining: boolean;
  nightlife: boolean;
  buttonLink: string;
  buttonText: string;
}): ReactElement {
  return (
    <div
      className="bg-cover bg-center h-72 flex items-center justify-between space-x-2 mt-3 p-5 text-white"
      style={{
        backgroundImage: `url(${bgImageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <div>
        <div className="flex items-center space-x-2 ">
          <img
            src={profilePicture}
            alt="user profile image"
            className="hidden sm:block rounded-md h-40 w-60 object-cover border-white border-4 bg-violet-50"
          />
          <div>
            <div className="font-semibold text-xl sm:text-2xl sm:py-2">
              {restaurantName}
            </div>
            <div className="text-sm py-1">{description}</div>
            <ViewStarRating rating={rating} />
          </div>
        </div>
        <div className="text-sm pt-2 sm:pt-4">
          <div>
            <span className="text-violet-500">Address : </span>
            <span>
              {address.country}, {address.state}, {address.city},{" "}
              {address.street}, {address.postalCode}
            </span>
          </div>
          <div>
            <span className="text-violet-500">Timing : </span>
            <span>
              {openingHours?.open} to {openingHours?.close}
            </span>
          </div>
          <div className=" font-semibold text-violet-200 pt-1">
            <span>Order Online</span>
            <span>{dining ? ", Dining" : null}</span>
            <span>{nightlife ? " and Nightlife" : null}</span>
          </div>
        </div>
      </div>
      <Link
        href={buttonLink}
        className="bg-violet-950 rounded-md px-3 py-1 min-w-fit text-sm sm:text-base"
      >
        {buttonText}
      </Link>
    </div>
  );
}
