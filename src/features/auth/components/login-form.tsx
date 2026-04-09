"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api";
import { useLogin } from "../hooks/use-auth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login.mutate(data);
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

      {login.error && (
        <p className="text-xs text-destructive text-center">
          {login.error instanceof ApiError
            ? login.error.error
            : "Something went wrong"}
        </p>
      )}

      <Button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mt-1"
      >
        {login.isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
};
