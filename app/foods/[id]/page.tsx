import prisma from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import React from "react";

import EditIssueButton from "./EditIssueButton";
import FoodDetails from "./FoodDetails";

interface FoodDetailProps {
  params: { id: string };
}

export default async function FoodDetail({ params }: FoodDetailProps) {
  const singleFood = await prisma.food.findUnique({
    where: { id: parseInt(params?.id) },
  });

  if (!singleFood) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <FoodDetails food={singleFood} />
      </Box>
      <Box>
        <EditIssueButton foodId={singleFood.id} />
      </Box>
    </Grid>
  );
}
