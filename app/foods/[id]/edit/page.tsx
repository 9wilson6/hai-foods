import prisma from "@/lib/prisma";
import React from "react";
import FoodForm from "../../_components/FoodForm";
import { notFound } from "next/navigation";

interface EditFoodPageProps {
  params: { id: string };
}

export default async function EditFoodPage({ params }: EditFoodPageProps) {
  const food = await prisma.food.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!food) notFound();

  return <FoodForm food={food} />;
}
