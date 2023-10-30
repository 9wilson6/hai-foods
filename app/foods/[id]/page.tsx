import FoodStateBadge from "@/components/FoodStatusBadge";
import prisma from "@/lib/prisma";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{singleFood.title}</Heading>
        <Flex className="space-x-4" my="3">
          <FoodStateBadge status={singleFood.status} />
          <Text>{singleFood.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{singleFood.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/foods/${singleFood.id}/edit`}>Edit Food</Link>
        </Button>
      </Box>
    </Grid>
  );
}
