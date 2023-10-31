import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { createFoodSchema } from "@/lib/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

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
