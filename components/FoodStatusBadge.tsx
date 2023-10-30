import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "violet" | "red" }
> = {
  ORGANIC: { label: "Organic", color: "green" },
  GENETICALLY_MODIFIED: { label: "Genetically Modified", color: "violet" },
  INORGANIC: { label: "In Organic", color: "red" },
};

interface FoodStatusBadgeProps {
  status: Status;
}

export default function FoodStateBadge({ status }: FoodStatusBadgeProps) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
