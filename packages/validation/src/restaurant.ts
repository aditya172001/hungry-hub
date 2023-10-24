import { z } from "zod";
import { addressSchema } from "./address";

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
export const nameSchema = z.string().optional();
export type nameType = z.infer<typeof nameSchema>;

export const descriptionSchema = z.string().optional();
export type descriptionType = z.infer<typeof descriptionSchema>;

export const profilePictureSchema = z.string().url().optional();
export type profilePictureType = z.infer<typeof profilePictureSchema>;

export const openingHoursSchema = z.object({
  open: z.string().max(15),
  close: z.string().max(15),
});
export type openingHoursType = z.infer<typeof openingHoursSchema>;

export const diningSchema = z.boolean().optional().nullable();
export type diningType = z.infer<typeof diningSchema>;

export const nightlifeSchema = z.boolean().optional().nullable();
export type nightlifeType = z.infer<typeof nightlifeSchema>;

//used in api/owner/restaurants(POST)
export const restaurantSchema = z.object({
  restaurantName: z.string(),
  description: z.string(),
  profilePicture: z.string().url(),
  address: addressSchema,
  openingHours: z.object({
    open: z.string(),
    close: z.string(),
  }),
  dining: z.boolean(),
  nightlife: z.boolean(),
});
export type restauantType = z.infer<typeof restaurantSchema>;
