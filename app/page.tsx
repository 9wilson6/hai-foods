import Pagination from "@/components/Pagination";
import { Heading } from "@radix-ui/themes";
import React from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <Heading>Home</Heading>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
        // currentPage={2}
      />
    </>
  );
}
