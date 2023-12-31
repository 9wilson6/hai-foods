import FoodStatusFilter from "@/components/FoodStatusFilter";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function FoodActions() {
  return (
    <Flex mb="5" justify="between">
      <FoodStatusFilter />
      <Button>
        <Link href="/foods/new">New Food</Link>
      </Button>
    </Flex>
  );
}
