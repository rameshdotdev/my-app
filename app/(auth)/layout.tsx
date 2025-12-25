import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Background gradients (clipped) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT BRAND */}
        <div className="hidden lg:flex flex-col justify-center px-20">
          <h1 className="text-5xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Securely manage your projects, skills, social links, and
            applications from a single powerful dashboard.
          </p>

          <p className="mt-10 text-sm text-muted-foreground">
            Built with Next.js, shadcn/ui & MERN Stack
          </p>
        </div>

        {/* RIGHT AUTH CONTENT */}
        <div className="flex h-full items-center justify-center px-6">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
