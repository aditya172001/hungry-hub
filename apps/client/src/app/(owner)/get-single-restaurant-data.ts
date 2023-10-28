import { Restaurant, ensureDbConnection } from "db";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { validateUserSession } from "../api/validateUserSession";
import { RestaurantInfoType } from "types";

export async function getSingleRestaurantData(restaurantID: string) {
  //get the data from db

  try {
    await ensureDbConnection();
    const session = await getServerSession(authOptions);
    const user = await validateUserSession(session);
    const myRestaurant = await Restaurant.findById(restaurantID);
    if (user._id.toString() !== myRestaurant.restaurantOwner.toString()) {
      return null;
    }
    await myRestaurant.populate(["address", "reviews", "menu"]);
    const {
      restaurantName,
      description,
      profilePicture,
      address,
      openingHours,
      menu,
      reviews,
      dining,
      nightlife,
    } = myRestaurant;

    const totalRating = reviews.reduce(
      (sum: number, review: { rating: number }) => sum + review.rating,
      0
    );
    const rating = reviews.length > 0 ? totalRating / reviews.length : 0;

    const restaurant: RestaurantInfoType = {
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
    };

    return restaurant;
  } catch (error) {
    console.error(error);
    return null;
  }
}
