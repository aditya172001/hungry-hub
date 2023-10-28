import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Review } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";
import { ReviewType } from "types";

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
        populate: [{ path: "items" }, { path: "deliveryAddress" }],
      },
    ]);

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No reviews found for the user" },
        { status: 404 }
      );
    }

    reviews = reviews.map((review) => {
      return {
        reviewID: review._id,
        restaurantName: review.restaurant.restaurantName,
        restaurantProfilePicture: review.restaurant.profilePicture,
        items: review.order.items,
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
