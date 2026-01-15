"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SocialEditor from "./SocialEditor";
import { NavbarPreview } from "./NavbarPreview";
import { api } from "@/lib/axios";
import { fetchContacts } from "@/lib/api/hero";
import { useAppDispatch } from "@/hooks/hooks";
import { setContactData } from "@/store/features/contactSlice";
import type { ContactData, SocialMap } from "@/types/type";

export default function ContactForm({
  initialData,
}: {
  initialData: ContactData;
}) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState(initialData.email ?? "");
  const [socials, setSocials] = useState<[string, SocialMap[string]][]>(
    Object.entries(initialData.social ?? {})
  );
  const [saving, setSaving] = useState(false);

  // 🔁 Detect unsaved changes
  const hasChanges = useMemo(() => {
    return (
      email !== initialData.email ||
      JSON.stringify(Object.fromEntries(socials)) !==
        JSON.stringify(initialData.social)
    );
  }, [email, socials, initialData]);

  // ⌨️ Cmd/Ctrl + S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasChanges, saving]);

  const normalizeSocials = () => {
    const result: Record<string, any> = {};
    socials.forEach(([key, social]) => {
      const finalKey = key?.trim() || social.name?.trim();
      if (!finalKey) return;

      result[finalKey] = {
        name: social.name,
        url: social.url,
        icon: social.icon,
        navbar: social.navbar,
      };
    });
    return result;
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload: ContactData = {
        email,
        social: normalizeSocials(),
      };

      await api.post("/contact", payload);
      const res = await fetchContacts();
      dispatch(setContactData(res.data));

      toast.success("Contact information saved");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save contact info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p className="text-sm text-muted-foreground">
          Manage your public email and social links.
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-8 pt-6 lg:grid-cols-3">
        {/* Left: Form */}
        <div className="space-y-8 lg:col-span-2">
          {/* Email */}
          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium">Contact Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              Displayed publicly on your portfolio.
            </p>
          </div>

          {/* Socials */}
          <SocialEditor socials={socials} setSocials={setSocials} />
        </div>

        {/* Right: Live Preview */}
        <NavbarPreview socials={socials} />
      </CardContent>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 flex items-center justify-between border-t bg-background/80 px-6 py-4 backdrop-blur">
        {hasChanges ? (
          <span className="text-sm text-amber-600">Unsaved changes</span>
        ) : (
          <span className="text-sm text-muted-foreground">
            All changes saved
          </span>
        )}

        <Button onClick={handleSave} disabled={!hasChanges || saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Card>
  );
}
