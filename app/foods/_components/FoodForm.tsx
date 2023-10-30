"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";

import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodForm, createFoodSchema } from "@/lib/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

import dynamic from "next/dynamic";
import { Food } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface FoodFormProps {
  food?: Food;
}
export default function FoodForm({ food }: FoodFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodForm>({
    resolver: zodResolver(createFoodSchema),
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/foods", data);
      router.push("/foods");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={food?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={food?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Food {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
