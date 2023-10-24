import mongoose from "mongoose";
import { Order } from "./order";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  reviewText: {
    type: String,
  },
  reviewDateTime: {
    type: Date,
    default: Date.now,
    required: true,
    immutable: true,
  },
});

//all pre middlware here are wrong fix them

reviewSchema.pre("deleteOne", async function () {
  const review = this as any;
  const orderId = review.order;
  await Order.deleteOne({ _id: orderId });
});

reviewSchema.pre("deleteMany", async function () {
  const query = this.getQuery();
  const reviewsToDelete = await this.model.find(query);

  const orderIds = reviewsToDelete.map((review) => review.order);

  await Order.deleteMany({ _id: { $in: orderIds } });
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
