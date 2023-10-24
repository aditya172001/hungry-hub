import { z } from "zod";

export const reviewSchema = z.object({
  order: z.string(),
  rating: z.number().min(1).max(5).int(),
  reviewText: z.string().optional(),
});
export type reviewType = z.infer<typeof reviewSchema>;
