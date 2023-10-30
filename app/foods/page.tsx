import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function Foods() {
  return (
    <div>
      <Button>
        <Link href="/foods/new">New Food</Link>
      </Button>
    </div>
  );
}
