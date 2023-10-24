import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, Restaurant, Review, User, Order } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validateUserSession } from "../../validateUserSession";
import { reviewSchema } from "validation";

interface ReviewType {
  user: string;
  restaurant: string;
  order: string;
  rating: number;
  reviewText?: string;
}

//used to post new review of a restauant on an order.
export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);

    const userID = myUser._id;

    //get info to be added in review and validate it
    const rawReview = await request.json();
    console.log(rawReview);
    const parsedReview = reviewSchema.safeParse(rawReview);
    if (
      !parsedReview.success ||
      !parsedReview.data.order ||
      !parsedReview.data.rating
    ) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }
    const { order, rating, reviewText } = parsedReview.data;

    //check if this order was actually placed by current user
    const myOrder = await Order.findOne({ _id: order, user: userID });
    if (!myOrder) {
      return NextResponse.json(
        { error: "Order does not exist" },
        { status: 404 }
      );
    }
    const restaurantID = myOrder.restaurant;

    //if review already exists then return
    const oldReview = await Review.findOne({ order });
    if (oldReview) {
      return NextResponse.json(
        { error: "Review already exist" },
        { status: 400 }
      );
    }

    //if new review then format the data and save
    const myReview: ReviewType = {
      user: userID,
      restaurant: restaurantID,
      order,
      rating,
    };
    if (reviewText) myReview.reviewText = reviewText;

    const newReview = new Review(myReview);
    const savedReview = await newReview.save();

    //update the reference of this review in restaurant table
    await Restaurant.findByIdAndUpdate(restaurantID, {
      $push: { reviews: savedReview._id },
    });

    return NextResponse.json(
      { status: "success", message: "Review submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
