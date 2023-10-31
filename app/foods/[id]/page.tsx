import prisma from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import React from "react";

import EditIssueButton from "./EditIssueButton";
import FoodDetails from "./FoodDetails";
import DeleteFoodButton from "./DeleteFoodButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

interface FoodDetailProps {
  params: { id: string };
}

export default async function FoodDetail({ params }: FoodDetailProps) {
  const session = await getServerSession(authOptions);

  const singleFood = await prisma.food.findUnique({
    where: { id: parseInt(params?.id) },
  });

  if (!singleFood) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <FoodDetails food={singleFood} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton foodId={singleFood.id} />
            <DeleteFoodButton foodId={singleFood.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}
