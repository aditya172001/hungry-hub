import { NextRequest, NextResponse } from "next/server";
import { Address, Restaurant, ensureDbConnection } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { validateUserSession } from "@/app/api/validateUserSession";
import {
  addressSchema,
  descriptionSchema,
  diningSchema,
  nameSchema,
  nightlifeSchema,
  openingHoursSchema,
  profilePictureSchema,
  restaurantIdSchema,
} from "validation";

//GET detailed info of a restaurant
export async function GET(request: NextRequest, context: any) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    let { restaurantID } = context.params;
    const parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);
    if (!parsedRestaurantID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID type" },
        { status: 400 }
      );
    }
    restaurantID = parsedRestaurantID.data;

    //get restaurant info
    const myRestaurant = await Restaurant.findOne({
      _id: restaurantID,
      restaurantOwner: myUser._id,
    }).populate(["menu", "address"]);
    if (!myRestaurant)
      return NextResponse.json(
        { status: "error", message: "Restaurant Not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { status: "success", myRestaurant },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurants/details(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

interface UpdatedRestaurantType {
  restaurantName?: string;
  description?: string;
  profilePicture?: string;
  openingHours?: { open: string; close: string };
  dining?: boolean;
  nightlife?: boolean;
}

//update the details of a restaurant
export async function PUT(request: NextRequest, context: any) {
  try {
    await ensureDbConnection();

    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //validate user input
    let { restaurantID } = context.params;
    const parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);
    if (!parsedRestaurantID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID type" },
        { status: 400 }
      );
    }
    restaurantID = parsedRestaurantID.data;

    if (!myUser.restaurants.includes(restaurantID)) {
      return NextResponse.json(
        { status: "error", message: "Restaurant does not belong to user" },
        { status: 403 }
      );
    }

    let {
      restaurantName,
      description,
      profilePicture,
      address,
      openingHours,
      dining,
      nightlife,
    } = await request.json();

    let parsedProfilePicture;
    try {
      parsedProfilePicture =
        await profilePictureSchema.parseAsync(profilePicture);
    } catch (error) {
      return NextResponse.json(
        { status: "error", message: "Invalid Profile Picture URL" },
        { status: 400 }
      );
    }
    const parsedRestaurantName = nameSchema.safeParse(restaurantName);
    const parsedDescription = descriptionSchema.safeParse(description);
    const parsedAddress = addressSchema.safeParse(address);
    const parsedOpeningHours = openingHoursSchema.safeParse(openingHours);
    const parsedDining = diningSchema.safeParse(dining);
    const parsedNightlife = nightlifeSchema.safeParse(nightlife);

    if (
      !parsedRestaurantName.success ||
      !parsedDescription.success ||
      !parsedAddress.success ||
      !parsedOpeningHours.success ||
      !parsedDining.success ||
      !parsedNightlife.success
    ) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }

    //updated restaurant
    let updatedRestaurant: UpdatedRestaurantType = {};
    if (restaurantName) updatedRestaurant.restaurantName = restaurantName;
    if (description) updatedRestaurant.description = description;
    if (profilePicture) updatedRestaurant.profilePicture = profilePicture;
    if (openingHours) updatedRestaurant.openingHours = openingHours;
    if (dining) updatedRestaurant.dining = dining;
    if (nightlife) updatedRestaurant.nightlife = nightlife;

    //if restaurant belongs to user then proceed and update
    const savedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantID },
      updatedRestaurant,
      { new: true }
    );
    //update the new address
    const savedAddress = await Address.findByIdAndUpdate(
      savedRestaurant.address,
      address
    );

    //if data couldn't be saved then return
    if (!savedRestaurant || !savedAddress) {
      return NextResponse.json(
        { status: "error", message: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Restaurant details updated sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurants/details(PUT)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//api currently not in use
//DELETE a restaurant
export async function DELETE(request: NextRequest, context: any) {
  try {
    await ensureDbConnection();

    //get user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //validate input
    let { restaurantID } = context.params;
    const parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);
    if (!parsedRestaurantID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID type" },
        { status: 400 }
      );
    }
    restaurantID = parsedRestaurantID.data;

    //check if the restaurant exists and delete it
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: restaurantID,
      restauantOwner: myUser._id,
    });
    if (!deletedRestaurant) {
      return NextResponse.json(
        { status: "error", message: "Restaurant not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Restaurant deleted sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "error in api/owner/restaurants/[restaurantID](DELETE)",
      error
    );
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
