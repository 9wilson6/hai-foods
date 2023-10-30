import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface FoodDetailProps {
  params: { id: string };
}

export default async function FoodDetail({ params }: FoodDetailProps) {
  if (typeof params.id !== "number") notFound();
  const singleFood = await prisma.food.findUnique({
    where: { id: parseInt(params?.id) },
  });

  if (!singleFood) {
    notFound();
  }
  return (
    <div>
      <p>{singleFood.title}</p>
      <p>{singleFood.description}</p>
      <p>{singleFood.status}</p>
      <p>{singleFood.createdAt.toDateString()}</p>
    </div>
  );
}
