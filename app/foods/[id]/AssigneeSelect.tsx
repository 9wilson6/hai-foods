"use client";
import { Food, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function AssigneeSelect({ food }: { food: Food }) {
  //   const {
  //     data: users,
  //     error,
  //     isLoading,
  //   } = useQuery<User[]>({
  //     queryKey: ["users"],
  //     queryFn: () => axios.get("/api/users").then((res) => res.data),
  //     staleTime: 60 * 100,
  //   });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const assignFood = (userId: string) => {
    axios
      .patch("/api/foods/" + food.id, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={food.assignedToUserId || ""}
        onValueChange={assignFood}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={"unassigned"}>Unassigned</Select.Item>
            {users.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
