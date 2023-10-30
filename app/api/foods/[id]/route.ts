import prisma from "@/lib/prisma";
import { createFoodSchema } from "@/lib/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = createFoodSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const food = await prisma.food.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!food) {
    return NextResponse.json({ error: "Invalid food" }, { status: 404 });
  }

  const updatedFood = await prisma.food.update({
    where: { id: food.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedFood);
}
