import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-surface border border-border rounded-3xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-2xl font-extrabold text-foreground tracking-tight">
            Daylik
          </span>
          <p className="text-sm text-text-2 mt-1">Sign in to your account</p>
        </div>

        <LoginForm />

        {/* Footer */}
        <p className="text-xs text-text-2 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
