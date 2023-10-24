import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ProfileHeader, OwnerRestaurantCard } from "ui";
import { getAllRestaurantsData } from "../get-all-restaurants-data";

export default async function OwnerAllRestaurants() {
  let userProfileImage = "/empty-profile-picture.png";
  const session = await getServerSession(authOptions);
  let userProfileName = "user";
  if (session?.user?.name) {
    userProfileName = session.user.name;
  } else if (session?.user?.email) {
    userProfileName = session?.user?.email;
  }
  if (session?.user?.image) {
    userProfileImage = session.user.image;
  }

  const restaurants = await getAllRestaurantsData();

  return (
    <div>
      <ProfileHeader
        profileImage={userProfileImage}
        profileName={userProfileName}
        isButtonPresent={true}
        buttonText="Add a new restaurant"
        buttonLink="/register-restaurant"
        bgImageLink="/owner-restaurants-dash.jpg"
      />
      <div className="flex flex-wrap py-5 items-center justify-center">
        {restaurants ? (
          restaurants.map((restaurant, index) => {
            return <OwnerRestaurantCard key={index} restaurant={restaurant} />;
          })
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex items-center justify-center max-h-screen">
        {!restaurants || restaurants.length === 0 ? (
          <div>No restaurants available</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
