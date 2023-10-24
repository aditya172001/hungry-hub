import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Item, Order, Restaurant, User } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";
import { orderStatusType, paymentStatusType, orderSchema } from "validation";

interface OrderType {
  user: string;
  restaurant: string;
  items: string[];
  deliveryAddress: string;
  orderStatus: orderStatusType;
  paymentStatus: paymentStatusType;
}

//used to place a new order
export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get current user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    const rawOrder = await request.json();
    const parsedOrder = orderSchema.safeParse(rawOrder);
    if (!parsedOrder.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }
    if (parsedOrder.data.items.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No items in cart" },
        { status: 400 }
      );
    }

    //check if restaurant exits
    const restaurantID = parsedOrder.data.restaurant;
    if (!(await Restaurant.findById(restaurantID))) {
      return NextResponse.json(
        { status: "error", message: "Invalid restaurantID" },
        { status: 404 }
      );
    }

    const itemIds = parsedOrder.data.items; // An array of item IDs
    const itemsInDB = await Item.find({ _id: { $in: itemIds } });

    if (itemsInDB.length !== itemIds.length) {
      return NextResponse.json(
        {
          status: "error",
          message: "Some items are invalid",
        },
        { status: 404 }
      );
    }

    for (const item of itemsInDB) {
      //check if all items belong to same restaurant
      if (item.restaurant.toString() !== restaurantID) {
        return NextResponse.json(
          {
            status: "error",
            message: "All items should be ordered from the same restaurant",
          },
          { status: 400 }
        );
      }
    }

    //customise data to be saved
    let myorder: OrderType = {
      user: myUser._id,
      restaurant: restaurantID,
      items: parsedOrder.data.items,
      deliveryAddress: myUser.address,
      orderStatus: "delivered",
      paymentStatus: "paid",
    };
    const newOrder = new Order(myorder);
    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(myUser._id, {
      $push: { orders: savedOrder._id },
    });

    return NextResponse.json(
      {
        status: "success",
        orderID: savedOrder._id,
        message: "Order placed and delivered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
