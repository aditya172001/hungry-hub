import { NextRequest, NextResponse } from "next/server";
import { Restaurant, ensureDbConnection } from "db";
import { restaurantIdSchema } from "validation";

//api not being used anywhere
//get more info about a specific restaurant including menu
export async function GET(request: NextRequest, context: any) {
  try {
    await ensureDbConnection();
    //get restaurantID from dynamic route
    let { restaurantID } = context.params;

    const parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);
    if (!parsedRestaurantID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID type" },
        { status: 400 }
      );
    }
    restaurantID = parsedRestaurantID.data;

    const restaurant = await Restaurant.findById(restaurantID).populate([
      "menu",
      "reviews",
      "address",
    ]);

    if (!restaurant) {
      return NextResponse.json(
        { status: "error", message: "Restaurant Not Found" },
        { status: 404 }
      );
    }

    const {
      restaurantName,
      description,
      profilePicture,
      address,
      openingHours,
    } = restaurant;
    let { menu } = restaurant;

    //customise menu data to be sent
    menu = menu.map((item: any) => {
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

    return NextResponse.json(
      {
        status: "success",
        restaurant: {
          restaurantName,
          description,
          profilePicture,
          address,
          rating,
          openingHours,
          menu,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/restaurant(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
