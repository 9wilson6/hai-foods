import prisma from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FoodStateBadge from "./FoodStatusBadge";
import Pagination from "./Pagination";

export default async function LatestFoods() {
  const foods = await prisma.food.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Eat Organic Foods
      </Heading>
      <Table.Root>
        <Table.Body>
          {foods.map((food) => {
            return (
              <>
                <Table.Row key={food.id}>
                  <Table.Cell>
                    <Flex justify="between">
                      <Flex direction="column" align="start" gap="2">
                        <Link href={`/foods/${food.id}`}>{food.title}</Link>
                        <FoodStateBadge status={food.status} />
                      </Flex>
                      {food.assignedToUser && (
                        <Avatar
                          src={food.assignedToUser.image!}
                          fallback="?"
                          size="1"
                          radius="full"
                        />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
