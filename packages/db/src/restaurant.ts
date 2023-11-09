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

export const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
