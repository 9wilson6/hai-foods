import FoodStateBadge from "@/components/FoodStatusBadge";
import prisma from "@/lib/prisma";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default async function Foods() {
  const foods = await prisma.food.findMany({});
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/foods/new">New Food</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Food</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Harvested
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {foods.map((food) => {
            const { id, title, status, createdAt } = food;
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  {title}
                  <div className="block md:hidden">
                    <FoodStateBadge status={status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <FoodStateBadge status={status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
