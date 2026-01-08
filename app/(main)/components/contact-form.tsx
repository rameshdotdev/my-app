"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormState>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ======================
        Validation
  ====================== */
  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* ======================
        Submit
  ====================== */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    console.log("Form submitted:", form);

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }, 3000);
  };

  /* ======================
        Render
  ====================== */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-3xl mx-auto rounded-3xl border bg-background shadow-2xl overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Get In Touch</h2>
              <p className="text-sm text-muted-foreground">
                I&apos;d love to hear from you
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            /* ================= Success ================= */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-muted-foreground">
                I&apos;ll get back to you soon.
              </p>

              <div className="mt-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ================= Form ================= */
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name */}
              <Field
                label="Your Name"
                icon={<User size={18} />}
                error={errors.name}
              >
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Doe"
                />
              </Field>

              {/* Email */}
              <Field
                label="Email Address"
                icon={<Mail size={18} />}
                error={errors.email}
              >
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                />
              </Field>

              {/* Message */}
              <Field
                label="Your Message"
                icon={<MessageSquare size={18} />}
                error={errors.message}
              >
                <Textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Hi, I'd like to discuss a project..."
                />
              </Field>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                    <Sparkles className="ml-2 h-4 w-4 opacity-80" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                I typically respond within 24 hours
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ======================
     Reusable Field
====================== */
function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
          {error}
        </p>
      )}
    </div>
  );
}
