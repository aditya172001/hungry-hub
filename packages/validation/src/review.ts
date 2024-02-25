import { z } from "zod";

export const reviewSchema = z.object({
  order: z.string(),
  rating: z.number().min(1).max(5).int(),
  reviewText: z
    .string()
    .max(100, { message: "Review text cannot exceed 100 characters" })
    .optional(),
});
export type reviewType = z.infer<typeof reviewSchema>;
