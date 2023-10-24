import mongoose from "mongoose";
import { Address } from "./address";
import { Item } from "./item";
import { Review } from "./review";

const restaurantSchema = new mongoose.Schema({
  restaurantOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  openingHours: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
  dining: {
    type: Boolean,
    required: true,
  },
  nightlife: {
    type: Boolean,
    required: true,
  },
});

//all pre middlware here are wrong fix them

restaurantSchema.pre("findOneAndDelete", async function () {
  // Access the document being deleted using the query
  const restaurant = this as any;

  const addressId = restaurant.address;
  const menuIds = restaurant.menu;
  const reviewIds = restaurant.reviews;

  await Address.deleteOne({ _id: addressId });
  await Item.deleteMany({ _id: { $in: menuIds } });
  await Review.deleteMany({ _id: { $in: reviewIds } });
});

restaurantSchema.pre("deleteOne", async function () {
  // Access the document being deleted using the query
  const restaurant = this as any;

  const addressId = restaurant.address;
  const menuIds = restaurant.menu;
  const reviewIds = restaurant.reviews;

  await Address.deleteOne({ _id: addressId });
  await Item.deleteMany({ _id: { $in: menuIds } });
  await Review.deleteMany({ _id: { $in: reviewIds } });
});

restaurantSchema.pre("deleteMany", async function () {
  const query = this.getQuery();
  const restaurantsToDelete = await this.model.find(query);

  const addressIds = restaurantsToDelete.map(
    (restaurant) => restaurant.address
  );
  const menuIds = restaurantsToDelete.reduce(
    (ids, restaurant) => ids.concat(restaurant.menu),
    []
  );
  const reviewIds = restaurantsToDelete.reduce(
    (ids, restaurant) => ids.concat(restaurant.reviews),
    []
  );

  await Address.deleteMany({ _id: { $in: addressIds } });
  await Item.deleteMany({ _id: { $in: menuIds } });
  await Review.deleteMany({ _id: { $in: reviewIds } });
});

export const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
