import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createFoodSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createFoodSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newFood = await prisma.food.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newFood, { status: 201 });
}
