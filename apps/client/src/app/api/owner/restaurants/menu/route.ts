import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Item, Restaurant } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { validateUserSession } from "@/app/api/validateUserSession";
import {
  courseType,
  cuisineType,
  itemIdSchema,
  itemPostSchema,
  itemPutSchema,
  restaurantIdSchema,
  vegType,
} from "validation";
import { headers } from "next/headers";
import { ZodError } from "zod";

//get a dish info
export async function GET(request: NextRequest, context: any) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    let itemID = request.headers.get("itemID");
    const parsedItemID = itemIdSchema.safeParse(itemID);
    if (!parsedItemID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid itemID type" },
        { status: 400 }
      );
    }
    itemID = parsedItemID.data;

    //get restaurant info
    const myItem = await Item.findOne({
      _id: itemID,
      restaurant: { $in: myUser.restaurants },
    });
    if (!myItem)
      return NextResponse.json(
        { status: "error", message: "Restaurant Not found" },
        { status: 404 }
      );

    return NextResponse.json({ status: "success", myItem }, { status: 200 });
  } catch (error) {
    console.error("error in api/owner/restaurants/details(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//add new dish in the menu
export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //validate user input
    const rawItem = await request.json();
    let parsedItem;
    try {
      parsedItem = await itemPostSchema.parseAsync(rawItem);
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

    const {
      restaurant,
      itemName,
      description,
      imageURL,
      price,
      cuisine,
      course,
      veg,
    } = parsedItem;

    //check if restaurant belongs to the user
    const restaurantExistsInUser = myUser.restaurants.some(
      (userRestaurant: string) => {
        return userRestaurant.toString() === restaurant;
      }
    );

    if (!restaurantExistsInUser) {
      return NextResponse.json(
        { status: "error", message: "Restaurant does not belong to user" },
        { status: 400 }
      );
    }

    //customise the item to be added in menu and save the data in Item collection
    const myitem = {
      restaurant,
      itemName,
      description,
      imageURL,
      price,
      cuisine,
      course,
      veg,
    };
    const newItem = new Item(myitem);
    const savedItem = await newItem.save();

    //add reference of the new item in restaurant menu
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurant, {
      $push: { menu: savedItem._id },
    });

    if (!savedItem || !updatedRestaurant) {
      return NextResponse.json(
        { status: "error", message: "Failed to add item to the menu" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "New item added in menu" },
      { status: 201 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurant/menu(POST)", error);

    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

interface ItemType {
  itemName?: string;
  description?: string;
  imageURL?: string;
  price?: number;
  cuisine?: cuisineType;
  course?: courseType;
  veg?: vegType;
}

//update a dish in menu
export async function PUT(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //validate input
    const rawItem = await request.json();
    let parsedItem;
    try {
      parsedItem = await itemPutSchema.parseAsync(rawItem);
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

    const {
      itemID,
      restaurantID,
      itemName,
      description,
      imageURL,
      price,
      cuisine,
      course,
      veg,
    } = parsedItem;

    //check if the restaurant which the item belongs to also belongs to the current user
    const myItem = await Item.findById(itemID);
    if (
      !myUser.restaurants.includes(myItem.restaurant) ||
      myItem.restaurant.toString() !== restaurantID
    ) {
      return NextResponse.json(
        { status: "error", message: "User, Restaurant and Item do not match" },
        { status: 400 }
      );
    }

    //update the info the the item and save it
    let myitem: ItemType = {};
    if (itemName) myitem.itemName = itemName;
    if (description) myitem.description = description;
    if (imageURL) myitem.imageURL = imageURL;
    if (price !== undefined) myitem.price = price;
    if (cuisine) myitem.cuisine = cuisine;
    if (course) myitem.course = course;
    if (veg !== undefined) myitem.veg = veg;
    const savedItem = await Item.findByIdAndUpdate(itemID, myitem);

    if (!savedItem) {
      return NextResponse.json(
        { status: "error", message: "Failed to update item" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Item updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurant/menu(PUT)", error);

    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//delete a dish in menu
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    const headersList = headers();
    let itemID = headersList.get("itemID");
    let restaurantID = headersList.get("restaurantID");
    let parsedItemID = itemIdSchema.safeParse(itemID);
    let parsedRestaurantID = restaurantIdSchema.safeParse(restaurantID);

    if (!parsedItemID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid itemID" },
        { status: 400 }
      );
    }
    if (!parsedRestaurantID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID" },
        { status: 400 }
      );
    }
    itemID = parsedItemID.data;
    restaurantID = parsedRestaurantID.data;
    if (!myUser.restaurants.includes(restaurantID)) {
      return NextResponse.json(
        { status: "error", message: "Restaurant does not belong to user" },
        { status: 400 }
      );
    }

    //delete the given item of the restaurant which belongs to the current user
    const deletionResult = await Item.deleteOne({
      _id: itemID,
      restaurant: restaurantID,
    });

    if (deletionResult.deletedCount === 0) {
      return NextResponse.json(
        { status: "error", message: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/owner/restaurant/menu(DELETE)", error);

    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
