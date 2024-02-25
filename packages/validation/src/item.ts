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
  itemName: z
    .string()
    .min(3, { message: "Item name must be at least 3 characters long" })
    .max(30, { message: "Item name cannot exceed 30 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(80, { message: "Description cannot exceed 80 characters" }),
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
  itemName: z
    .string()
    .min(3, { message: "Item name must be at least 3 characters long" })
    .max(30, { message: "Item name cannot exceed 30 characters" })
    .optional(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(80, { message: "Description cannot exceed 80 characters" })
    .optional(),
  imageURL: imageUrlSchema.optional(),
  price: z.number().optional(),
  cuisine: cuisineSchema.optional(),
  course: courseSchema.optional(),
  veg: vegSchema.optional(),
});
export type itemPutType = z.infer<typeof itemPutSchema>;
