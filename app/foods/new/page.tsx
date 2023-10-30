import React from "react";
import dynamic from "next/dynamic";
import FoodFormSkeleton from "../_components/FoodFormSkeleton";

const FoodForm = dynamic(() => import("@/app/foods/_components/FoodForm"), {
  ssr: false,
  loading: () => <FoodFormSkeleton />,
});
export default function NewFood() {
  return (
    <div>
      <FoodForm />
    </div>
  );
}
