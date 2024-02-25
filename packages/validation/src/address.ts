import { z } from "zod";

export const addressSchema = z.object({
  street: z
    .string()
    .min(3, { message: "Street must be at least 3 characters long" })
    .max(20, { message: "Street cannot exceed 20 characters" }),
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" })
    .max(20, { message: "City cannot exceed 20 characters" }),
  state: z
    .string()
    .min(3, { message: "State must be at least 3 characters long" })
    .max(20, { message: "State cannot exceed 20 characters" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal Code must be at least 3 characters long" })
    .max(20, { message: "Postal Code cannot exceed 20 characters" }),
  country: z
    .string()
    .min(3, { message: "Country must be at least 3 characters long" })
    .max(20, { message: "Country cannot exceed 20 characters" }),
});

export type addressType = z.infer<typeof addressSchema>;
