import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { patchFoodSchema } from "@/lib/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validation = patchFoodSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
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
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedFood);
}

// Delete Food
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const food = await prisma.food.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!food) {
    return NextResponse.json({ error: "Invalid Food" }, { status: 404 });
  }

  await prisma.food.delete({
    where: { id: food.id },
  });

  return NextResponse.json({});
}
