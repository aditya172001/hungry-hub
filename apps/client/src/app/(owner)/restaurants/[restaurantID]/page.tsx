import { ReactElement } from "react";
import { getSingleRestaurantData } from "../../get-single-restaurant-data";
import { SingleRestaurantProfileHeader, Menu } from "ui";

export default async function OwnerSingleRestaurant({
  params,
}: {
  params: { restaurantID: string };
}): Promise<ReactElement> {
  const restaurant = await getSingleRestaurantData(params.restaurantID);
  if (!restaurant) {
    return <div>Error 404 restaurant not found</div>;
  }
  const {
    restaurantID,
    restaurantName,
    description,
    profilePicture,
    address,
    openingHours,
    menu,
    rating,
    dining,
    nightlife,
  } = restaurant;

  return (
    <div>
      <SingleRestaurantProfileHeader
        bgImageLink="/owner-single-restaurant-dash.avif"
        profilePicture={profilePicture}
        restaurantName={restaurantName}
        description={description}
        rating={rating}
        address={address}
        openingHours={openingHours}
        dining={dining}
        nightlife={nightlife}
        buttonText="Edit restaurant info"
        buttonLink={`/restaurants/${restaurantID}/update-details`}
      />
      <Menu menu={menu} restaurantID={restaurantID} />
    </div>
  );
}
