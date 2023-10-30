import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  foodId: number;
}

export default function EditIssueButton({ foodId }: Props) {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/foods/${foodId}/edit`}>Edit Food</Link>
    </Button>
  );
}
