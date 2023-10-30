import prisma from "@/lib/prisma";
import React from "react";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import FoodFormSkeleton from "../loading";

const FoodForm = dynamic(() => import("@/app/foods/_components/FoodForm"), {
  ssr: false,
  loading: () => <FoodFormSkeleton />,
});

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
