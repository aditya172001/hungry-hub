import { Restaurant, ensureDbConnection } from "db";
import { ItemForUserMenuType } from "types";
import { restaurantIdSchema } from "validation";

export async function getSingleRestaurantData(restaurantID: string) {
  try {
    await ensureDbConnection();

    const parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);
    if (!parsedRestaurantID.success) return null;
    restaurantID = parsedRestaurantID.data;

    const restaurant = await Restaurant.findById(restaurantID).populate([
      "menu",
      "reviews",
      "address",
    ]);

    if (!restaurant) return null;

    const {
      restaurantName,
      description,
      profilePicture,
      address,
      openingHours,
    } = restaurant;
    let { menu: rawMenu } = restaurant;

    //customise menu data to be sent
    const menu: ItemForUserMenuType[] | undefined = rawMenu.map((item: any) => {
      return {
        itemID: item._id,
        itemName: item.itemName,
        description: item.description,
        imageURL: item.imageURL,
        price: item.price,
        cuisine: item.cuisine,
        course: item.course,
        veg: item.veg,
      };
    });

    //find rating of restaurant
    const ratingSum = restaurant.reviews.reduce(
      (sum: number, review: { rating: number }) => sum + review.rating,
      0
    );
    const rating = restaurant.reviews.length
      ? parseFloat((ratingSum / restaurant.reviews.length).toFixed(2))
      : 0;
    return {
      restaurantName,
      description,
      profilePicture,
      address,
      rating,
      openingHours,
      menu,
    };
  } catch (error) {
    console.error(
      "error in fetching data for app/(user)/search-restaurants/[restaurantID] :",
      error
    );
    return null;
  }
}
