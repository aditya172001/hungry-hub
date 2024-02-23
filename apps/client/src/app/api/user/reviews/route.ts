import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Review } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";

//used to get previous reviews place by user
export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get current user
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    //find reviews of current user
    let reviews = await Review.find({ user: myUser._id }).populate([
      { path: "restaurant" },
      {
        path: "order",
        populate: [{ path: "items.item" }, { path: "deliveryAddress" }],
      },
    ]);

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No reviews found for the user" },
        { status: 404 }
      );
    }
    console.log(reviews[0].order.items[0]);

    reviews = reviews.map((review) => {
      return {
        reviewID: review._id,
        restaurantName: review.restaurant.restaurantName,
        restaurantProfilePicture: review.restaurant.profilePicture,
        items: review.order.items.map((it: any) => {
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
        rating: review.rating,
        reviewText: review.reviewText,
        deliveryAddress: review.order.deliveryAddress,
        reviewDateTime: review.reviewDateTime,
      };
    });

    return NextResponse.json({ status: "success", reviews }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
