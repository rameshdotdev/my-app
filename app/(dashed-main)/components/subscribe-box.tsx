"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

export default function SubscribeSection() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) return toast.error("Email is required");
    if (!isValidEmail(trimmed)) return toast.error("Enter a valid email");

    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 900));

      toast.success("Subscribed successfully!", {
        description: trimmed,
        icon: <MailCheck className="h-4 w-4" />,
      });

      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-striped p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="flex w-full items-end gap-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>

        {/* Input wrapper (fixed height) */}
        <div className="h-10 w-full flex-1 rounded-[10px] border border-border bg-background p-[2px]">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full w-full rounded-[8px] border border-border bg-background px-2.5 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Button wrapper (same fixed height) */}
        <Button
          type="submit"
          disabled={isLoading}
          className="group h-10 w-30 select-none rounded-[10px] border border-border bg-background p-0.5 hover:bg-background"
        >
          <div className="flex h-full w-full items-center justify-center gap-1 rounded-[8px] border border-border bg-nonHover px-4 text-foreground transition duration-300 group-hover:bg-hover">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-[0.95rem] font-medium">Wait</span>
              </>
            ) : (
              <span className="text-[0.95rem] font-medium">Subscribe</span>
            )}
          </div>
        </Button>
      </form>
    </div>
  );
}
