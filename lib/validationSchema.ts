import { z } from "zod";
export const createFoodSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Food description is required"),
});

export type FoodForm = z.infer<typeof createFoodSchema>;
