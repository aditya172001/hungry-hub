import { z } from "zod";
import { addressSchema } from "./address";
import { imageUrlSchema } from "./images";

//restaurant type is dine-out, night-life, online-order
export const restaurantOptionSchema = z.enum([
  "order-online",
  "dine-out",
  "night-life",
]);
export type restaurantOptionType = z.infer<typeof restaurantOptionSchema>;

//used in api/restaurants/[restaurantid] , api/owner/restaurants/details(GET)  and api/owner/restaurants(DELETE)
export const restaurantIdSchema = z.string();
export type restaurantIdType = z.infer<typeof restaurantIdSchema>;

//used in api/owner/restaurants/[restaurantid](PUT)
export const nameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters long" })
  .max(30, { message: "Name cannot exceed 30 characters" })
  .optional();
export type nameType = z.infer<typeof nameSchema>;

export const descriptionSchema = z
  .string()
  .min(3, { message: "Description must be at least 3 characters long" })
  .max(80, { message: "Description cannot exceed 80 characters" })
  .optional();
export type descriptionType = z.infer<typeof descriptionSchema>;

export const profilePictureSchema = imageUrlSchema.optional();
export type profilePictureType = z.infer<typeof profilePictureSchema>;

export const openingHoursSchema = z.object({
  open: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i, {
    message: "Invalid time format (hh:mm AM/PM)",
  }),
  close: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i, {
    message: "Invalid time format (hh:mm AM/PM)",
  }),
});
export type openingHoursType = z.infer<typeof openingHoursSchema>;

export const diningSchema = z.boolean().optional().nullable();
export type diningType = z.infer<typeof diningSchema>;

export const nightlifeSchema = z.boolean().optional().nullable();
export type nightlifeType = z.infer<typeof nightlifeSchema>;

//used in api/owner/restaurants(POST)
export const restaurantSchema = z.object({
  restaurantName: z.string().min(3).max(30),
  description: z.string().min(3).max(80),
  profilePicture: imageUrlSchema,
  address: addressSchema,
  openingHours: openingHoursSchema,
  dining: z.boolean(),
  nightlife: z.boolean(),
});
export type restauantType = z.infer<typeof restaurantSchema>;
