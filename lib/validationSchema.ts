import { z } from "zod";
export const createFoodSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Food description is required").max(65535),
});

export const patchFoodSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Food description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export type FoodForm = z.infer<typeof createFoodSchema>;
