import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-surface border border-border rounded-3xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-2xl font-extrabold text-foreground tracking-tight">
            Daylik
          </span>
          <p className="text-sm text-text-2 mt-1">Create your account</p>
        </div>

        <RegisterForm />

        {/* Footer */}
        <p className="text-xs text-text-2 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
