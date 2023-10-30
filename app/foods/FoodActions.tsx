import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function FoodActions() {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/foods/new">New Food</Link>
      </Button>
    </div>
  );
}
