import { z } from "zod";

export const singupSchema = z.object({
  userName: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

export type singupType = z.infer<typeof singupSchema>;

export const singinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export type singinType = z.infer<typeof singupSchema>;

export const emailSchema = z.string().email();
export type emailType = z.infer<typeof emailSchema>;
