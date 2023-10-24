//schema for validation of dishes and related fields
import { z } from "zod";

export const citySchema = z.string();
export type cityType = z.infer<typeof citySchema>;

export const cuisineSchema = z
  .enum([
    "Indian",
    "Italian",
    "French",
    "Chinese",
    "Japanese",
    "Thai",
    "Mexican",
    "Other",
  ])
  .optional()
  .nullable();
export type cuisineType = z.infer<typeof cuisineSchema>;

export const courseSchema = z
  .enum(["Appetizer", "Main course", "Dessert", "Drinks"])
  .optional()
  .nullable();
export type courseType = z.infer<typeof courseSchema>;

export const vegSchema = z.boolean().optional().nullable();
export type vegType = z.infer<typeof vegSchema>;

export const searchSchema = z.string().optional().nullable();
export type searchType = z.infer<typeof searchSchema>;
