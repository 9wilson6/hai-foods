import FoodStateBadge from "@/components/FoodStatusBadge";
import prisma from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

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
    <div>
      <Heading>{singleFood.title}</Heading>
      <Flex className="space-x-4" my="3">
        <FoodStateBadge status={singleFood.status} />
        <Text>{singleFood.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{singleFood.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
