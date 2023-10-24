import { ensureDbConnection } from "db";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { validateUserSession } from "../api/validateUserSession";
import { RestaurantInfoType } from "types";

export async function getAllRestaurantsData() {
  //get the data from db
  await ensureDbConnection();
  const session = await getServerSession(authOptions);
  const rawUser = await validateUserSession(session);
  const myUser = await rawUser.populate({
    path: "restaurants",
    populate: {
      path: "reviews",
    },
  });

  //get all the restaurant of the user and customise the result to be sent
  const myRestaurants: RestaurantInfoType[] = myUser.restaurants.map(
    (restaurant: any) => {
      const { restaurantName, description, profilePicture, reviews } =
        restaurant;
      const restaurantID = restaurant._id;
      const totalRating = reviews.reduce(
        (sum: number, review: { rating: number }) => sum + review.rating,
        0
      );
      const rating = reviews.length > 0 ? totalRating / reviews.length : 0;

      return {
        restaurantID,
        restaurantName,
        description,
        profilePicture,
        rating,
      };
    }
  );
  return myRestaurants;
}
