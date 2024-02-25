import { z } from "zod";
import { imageUrlSchema } from "./images";
import { addressSchema } from "./address";

export const userSchema = z.object({
  userID: z.string().optional(),
  userName: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .optional(),
  profilePicture: imageUrlSchema.optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .optional(),
  userType: z.enum(["user", "resOwner"]).optional(),
  address: addressSchema.optional(),
  restaurants: z.array(z.string()).optional(),
  orders: z.array(z.string()).optional(),
});

export type userType = z.infer<typeof userSchema>;
