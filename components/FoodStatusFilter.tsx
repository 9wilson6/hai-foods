"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Organic", value: "ORGANIC" },
  { label: "GMO", value: "GENETICALLY_MODIFIED" },
  { label: "Inorganic", value: "INORGANIC" },
];

export default function FoodStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Type..." />
      <Select.Content>
        {statuses.map((status) => {
          const { label, value } = status;
          return (
            <Select.Item key={value} value={value || "null"}>
              {label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
}
