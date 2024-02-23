import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Item, Order, User } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";

//used to get previous orders place by user
export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get current user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //find orders of current user
    let orders = await Order.find({ user: myUser._id }).populate([
      { path: "items.item" },
      { path: "deliveryAddress" },
      { path: "restaurant" },
    ]);

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No orders found for the user" },
        { status: 404 }
      );
    }

    orders = orders.map((order) => {
      return {
        orderID: order._id,
        restaurantName: order.restaurant.restaurantName,
        restaurantProfilePicture: order.restaurant.profilePicture,
        items: order.items.map((it: any) => {
          return {
            item: {
              itemID: it.item?._id,
              restaurantID: it.item?.restaurant,
              itemName: it.item?.itemName,
              description: it.item?.description,
              imageURL: it.item?.imageURL,
              price: it.item?.price,
              cuisine: it.item?.cuisine,
              course: it.item?.course,
              veg: it.item?.veg,
            },
            quantity: it.item?.quantity,
          };
        }),
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        deliveryAddress: order.deliveryAddress,
        orderDateTime: order.orderDateTime,
      };
    });

    return NextResponse.json({ status: "success", orders }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
