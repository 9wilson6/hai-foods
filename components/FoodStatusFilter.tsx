"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Organic", value: "ORGANIC" },
  { label: "GMO", value: "GENETICALLY_MODIFIED" },
  { label: "Inorganic", value: "INORGANIC" },
];

export default function FoodStatusFilter() {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push("/foods" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Type..." />
      <Select.Content>
        {statuses.map((status) => {
          const { label, value } = status;
          return (
            // @ts-ignore
            <Select.Item key={value} value={value}>
              {label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
}
