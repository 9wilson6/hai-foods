import FoodStateBadge from "@/components/FoodStatusBadge";
import { Food } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function FoodDetails({ food }: { food: Food }) {
  return (
    <>
      <Heading>{food.title}</Heading>
      <Flex className="space-x-4" my="3">
        <FoodStateBadge status={food.status} />
        <Text>{food.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{food.description}</ReactMarkdown>
      </Card>
    </>
  );
}
