import { z } from "zod";

export const singupSchema = z.object({
  userName: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

export type singupType = z.infer<typeof singupSchema>;

export const singinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type singinType = z.infer<typeof singupSchema>;

export const emailSchema = z.string().email();
export type emailType = z.infer<typeof emailSchema>;
