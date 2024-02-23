import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Item, Order, Restaurant, User } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";
import {
  orderStatusType,
  paymentStatusType,
  orderSchema,
  orderIdSchema,
} from "validation";

interface OrderType {
  user: string;
  restaurant: string;
  items: { item: string; quantity: number }[];
  deliveryAddress: string;
  orderStatus: orderStatusType;
  paymentStatus: paymentStatusType;
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//used to place a new order
export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get current user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //if users address is not updated in db return 404 error
    if (!myUser.address) {
      return NextResponse.json(
        {
          status: "error",
          message: "Address not found. Please update user address",
        },
        { status: 404 }
      );
    }

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

    const itemIds = parsedOrder.data.items.map((it) => it.item); // An array of item IDs
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
      orderStatus: "pending",
      paymentStatus: "pending",
    };

    const newOrder = new Order(myorder);
    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(myUser._id, {
      $push: { orders: savedOrder._id },
    });

    // Create Checkout Sessions
    const stripeSession = await stripe.checkout.sessions.create({
      client_reference_id: myUser._id,
      customer_email: myUser.email,
      line_items: itemsInDB.map((it, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: it.itemName,
            },
            unit_amount: it.price * 100,
          },
          quantity: parsedOrder.data.items[index].quantity,
        };
      }),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/?success=true`,
      cancel_url: `${request.headers.get("origin")}/checkout/?canceled=true`,
    });

    return NextResponse.json(
      {
        status: "success",
        orderID: savedOrder._id,
        message: "Order is getting processed",
        url: stripeSession.url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

interface UpdateOrderType extends OrderType {
  _id: string;
}

//used to update status of an already placed order
export async function PATCH(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get current user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //if users address is not updated in db return 404 error
    if (!myUser.address) {
      return NextResponse.json(
        {
          status: "error",
          message: "Address not found. Please update user address",
        },
        { status: 404 }
      );
    }

    const rawOrderID = await request.json();
    const parsedOrderID = orderIdSchema.safeParse(rawOrderID);
    if (!parsedOrderID.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }

    //check if order exits
    const { orderID } = parsedOrderID.data;
    const orderData = (await Order.findById(orderID)) as UpdateOrderType;
    if (!orderData) {
      return NextResponse.json(
        { status: "error", message: "Invalid orderID" },
        { status: 404 }
      );
    }

    // check if order belongs to user
    if (orderData.user.toString() !== myUser._id.toString()) {
      return NextResponse.json(
        { status: "error", message: "Order does not belong to the user." },
        { status: 403 }
      );
    }

    if (
      orderData.paymentStatus === "paid" &&
      orderData.orderStatus === "delivered"
    ) {
      return NextResponse.json(
        { status: "error", message: "Order details already updated." },
        { status: 403 }
      );
    }

    // update status
    await Order.findByIdAndUpdate(orderID, {
      $set: {
        paymentStatus: "paid",
        orderStatus: "delivered",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Order placed and delivered successfully.",
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
