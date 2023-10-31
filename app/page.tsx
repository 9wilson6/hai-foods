import Pagination from "@/components/Pagination";
import { Heading } from "@radix-ui/themes";
import React from "react";

export default function Home() {
  return (
    <>
      <Heading>Home</Heading>
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </>
  );
}
