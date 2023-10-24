import { z } from "zod";

export const orderSchema = z.object({
  restaurant: z.string(),
  items: z.array(z.string()),
});
export type orderType = z.infer<typeof orderSchema>;

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);
export type orderStatusType = z.infer<typeof orderStatusSchema>;

export const paymentStatusSchema = z.enum(["pending", "paid", "failed"]);
export type paymentStatusType = z.infer<typeof paymentStatusSchema>;
