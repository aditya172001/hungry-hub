import { NextRequest, NextResponse } from "next/server";
import { Restaurant, ensureDbConnection } from "db";
import {
  citySchema,
  itemPostType,
  restaurantOptionSchema,
  searchSchema,
} from "validation";

//get a list of restauarnts in a city
export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    let restaurants = await Restaurant.find().populate([
      "menu",
      "address",
      "reviews",
    ]);
    const rawCity = request.headers.get("city");
    const rawRestaurantOption = request.headers.get("restaurantOption");
    let rawSearch = request.headers.get("search");

    const parsedCity = citySchema.safeParse(rawCity);
    const parsedRestaurantOption =
      restaurantOptionSchema.safeParse(rawRestaurantOption);
    const parsedSearch = searchSchema.safeParse(rawSearch);

    if (!parsedCity.success || !parsedRestaurantOption.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid city" },
        { status: 400 }
      );
    }
    if (!parsedRestaurantOption.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid RestaurantOption type" },
        { status: 400 }
      );
    }
    if (!parsedSearch.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid Search" },
        { status: 400 }
      );
    }

    const city = parsedCity.data;
    const restaurantOption = parsedRestaurantOption.data;
    let reqSearch = parsedSearch.data?.toLocaleLowerCase();

    //city filter
    restaurants = restaurants.filter((restaurant) => {
      return restaurant.address.city.toLowerCase() === city?.toLowerCase();
    });

    //dynamic filter to only return the restaurants of required type
    restaurants = restaurants.filter((restaurant) => {
      if (restaurantOption === "order-online") {
        return true;
      } else if (restaurantOption === "dine-out") {
        return restaurant.dining === true;
      } else if (restaurantOption === "night-life") {
        return restaurant.nightlife === true;
      } else {
        return false;
      }
    });

    // apply search filters
    if (reqSearch) {
      restaurants = restaurants.filter((restaurant) => {
        return (
          restaurant.restaurantName.toLowerCase().includes(reqSearch) ||
          restaurant.description.toLowerCase().includes(reqSearch) ||
          restaurant.menu.some(
            (item: itemPostType) =>
              item.itemName.toLowerCase().includes(reqSearch!) ||
              item.description.toLowerCase().includes(reqSearch!)
          )
        );
      });
    }

    //if no restaurants found/left return
    if (!restaurants || restaurants.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No restaurant available at the moment" },
        { status: 404 }
      );
    }

    //customise the result for data to be sent
    restaurants = restaurants.map((restaurant: any) => {
      //get the avg rating of a restaurant
      const ratingSum = restaurant.reviews.reduce(
        (sum: number, review: { rating: number }) => sum + review.rating,
        0
      );
      const rating = restaurant.reviews.length
        ? parseFloat((ratingSum / restaurant.reviews.length).toFixed(2))
        : 0;

      //get the avg price per dish (can assume per person)
      const totalPrice = restaurant.menu.reduce(
        (sum: number, item: { price: number }) => sum + item.price,
        0
      );
      const avgPrice = restaurant.menu.length
        ? parseFloat((totalPrice / restaurant.menu.length).toFixed(2))
        : 0;

      return {
        restaurantID: restaurant._id,
        restaurantName: restaurant.restaurantName,
        description: restaurant.description,
        profilePicture: restaurant.profilePicture,
        rating,
        avgPrice,
        openingHours: restaurant.openingHours,
      };
    });

    return NextResponse.json(
      { status: "success", restaurants },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/restaurants(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
