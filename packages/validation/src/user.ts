import { z } from "zod";
import { addressSchema } from "./address";

export const userSchema = z.object({
  userID: z.string().optional(),
  userName: z.string().optional(),
  profilePicture: z.string().url().optional(),
  email: z.string().email().optional(),
  password: z.string().min(4).optional(),
  userType: z.enum(["user", "resOwner"]).optional(),
  address: addressSchema.optional(),
  restaurants: z.array(z.string()).optional(),
  orders: z.array(z.string()).optional(),
});
export type userType = z.infer<typeof userSchema>;
