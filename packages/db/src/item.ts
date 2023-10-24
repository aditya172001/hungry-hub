import mongoose from "mongoose";
import { Restaurant } from "./restaurant";

const itemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cuisine: {
    type: String,
    enum: [
      "Indian",
      "Italian",
      "French",
      "Chinese",
      "Japanese",
      "Thai",
      "Mexican",
      "Other",
    ],
    required: true,
  },
  course: {
    type: String,
    enum: ["Appetizer", "Main course", "Dessert", "Drinks"],
    required: true,
  },
  veg: {
    type: Boolean,
    required: true,
  },
});

itemSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const filter = this.getFilter();
    try {
      const result = await Restaurant.updateOne(
        { _id: filter.restaurant },
        { $pull: { menu: filter._id } },
        { new: true }
      );
    } catch (error) {
      console.error(
        "error in pre middleware of item schema in mongoose",
        error
      );
    }
  }
);

export const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
