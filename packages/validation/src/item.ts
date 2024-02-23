import { z } from "zod";
import { courseSchema, cuisineSchema, vegSchema } from "./dishes";
import { imageUrlSchema } from "./images";

//api/owner/menu
//for DELETE
export const itemIdSchema = z.string();
export type itemIdType = z.infer<typeof itemIdSchema>;

//for POST
export const itemPostSchema = z.object({
  restaurant: z.string(),
  itemName: z.string().min(4),
  description: z.string().min(4),
  imageURL: imageUrlSchema,
  price: z.number(),
  cuisine: cuisineSchema,
  course: courseSchema,
  veg: vegSchema,
});
export type itemPostType = z.infer<typeof itemPostSchema>;

//for PUT
export const itemPutSchema = z.object({
  itemID: z.string(),
  restaurantID: z.string(),
  itemName: z.string().min(4).optional(),
  description: z.string().min(4).optional(),
  imageURL: imageUrlSchema.optional(),
  price: z.number().optional(),
  cuisine: cuisineSchema.optional(),
  course: courseSchema.optional(),
  veg: vegSchema.optional(),
});
export type itemPutType = z.infer<typeof itemPutSchema>;
