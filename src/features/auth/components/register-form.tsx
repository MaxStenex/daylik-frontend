"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api";
import { useRegister } from "../hooks/use-auth";

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const register_ = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = ({ email, password }: RegisterSchema) => {
    register_.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-[10px] font-bold text-text-2 tracking-widest uppercase"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-[10px] font-bold text-text-2 tracking-widest uppercase"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-[10px] font-bold text-text-2 tracking-widest uppercase"
        >
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {register_.error && (
        <p className="text-xs text-destructive text-center">
          {register_.error instanceof ApiError
            ? register_.error.error
            : "Something went wrong"}
        </p>
      )}

      <Button
        type="submit"
        disabled={register_.isPending}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mt-1"
      >
        {register_.isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
};
