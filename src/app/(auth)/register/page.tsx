import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Confirm password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-surface-2 border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
            />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mt-1">
            Create account
          </Button>
        </div>

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
