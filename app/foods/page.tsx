import FoodStateBadge from "@/components/FoodStatusBadge";
import prisma from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import Link from "@/components/Link";
import delay from "delay";

import React from "react";
import FoodActions from "./FoodActions";

export default async function Foods() {
  const foods = await prisma.food.findMany({});
  await delay(2000);
  return (
    <div>
      <FoodActions />
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
                  <Link href={`/foods/${id}`}>{title}</Link>
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
