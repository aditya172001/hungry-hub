import { NextRequest, NextResponse } from "next/server";
import { Restaurant, Address, ensureDbConnection, User } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";
import { restaurantSchema } from "validation";
import { RestaurantInfoType } from "types";
import { ZodError } from "zod";

//api currently not in use
//get general info of all restaurants of the user
export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get the user
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
        const {
          restaurantName,
          description,
          profilePicture,
          address,
          reviews,
          openingHours,
        } = restaurant;
        const { restaurantID } = restaurant._id;
        const { city } = address;

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
          city,
          rating,
          openingHours,
        };
      }
    );

    return NextResponse.json(
      { status: "success", myRestaurants },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurants(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

//add new restaurant
export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user
    const session = await getServerSession(authOptions);
    let myUser = await validateUserSession(session);

    if (myUser.userType === "user") {
      myUser = await User.findByIdAndUpdate(
        myUser._id,
        {
          userType: "resOwner",
        },
        { new: true }
      );
    }

    //validate user input
    const rawRestaurant = await request.json();
    let parsedRestaurant;
    try {
      parsedRestaurant = await restaurantSchema.parseAsync(rawRestaurant);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            status: "error",
            message: error.errors[0].message,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { status: "error", message: "Invalid Input" },
        { status: 400 }
      );
    }

    //get parsed data
    const {
      restaurantName,
      description,
      profilePicture,
      address,
      openingHours,
      dining,
      nightlife,
    } = parsedRestaurant;

    //save the address of the new restaurant
    const newAddress = new Address(address);
    const savedAddress = await newAddress.save();

    const myRestaurant = {
      restaurantOwner: myUser._id,
      restaurantName,
      description,
      profilePicture,
      address: savedAddress._id,
      openingHours,
      dining,
      nightlife,
    };

    //save the new restaurant data
    const newRestaurant = new Restaurant(myRestaurant);
    const savedRestaurant = await newRestaurant.save();
    await User.findByIdAndUpdate(myUser._id, {
      $push: { restaurants: savedRestaurant._id },
    });

    return NextResponse.json(
      { message: `${restaurantName} added successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurants(POST)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
