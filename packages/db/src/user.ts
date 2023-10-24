import mongoose, { Document } from "mongoose";
import { Address } from "./address";
import { Restaurant } from "./restaurant";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["user", "resOwner"],
    default: "user",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

//all pre middlware here are wrong fix them

userSchema.pre("deleteOne", async function () {
  const user = this as any;

  const addressId = user.address;
  const restaurantIds = user.restaurants;

  await Address.deleteOne({ _id: addressId });
  await Restaurant.deleteMany({ _id: { $in: restaurantIds } });
});

userSchema.pre("deleteMany", async function () {
  const query = this.getQuery();
  const usersToDelete = await this.model.find(query);

  const addressIds = usersToDelete.map((user) => user.address);
  const restaurantIds = usersToDelete.reduce(
    (ids, user) => ids.concat(user.restaurants),
    []
  );

  await Address.deleteMany({ _id: { $in: addressIds } });
  await Restaurant.deleteMany({ _id: { $in: restaurantIds } });
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
