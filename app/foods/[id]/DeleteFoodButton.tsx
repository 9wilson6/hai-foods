import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  foodId: number;
}

export default function DeleteFoodButton({ foodId }: Props) {
  return <Button color="red">Delete Food</Button>;
}
