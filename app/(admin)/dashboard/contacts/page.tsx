"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/admin/ContactForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { useAppSelector } from "@/hooks/hooks";
import { getContactData } from "@/store/features/contactSlice";

export default function AdminContactPage() {
  /* ======================
	 Redux State
  ====================== */
  const data = useAppSelector(getContactData);
  //   const dispatch = useAppDispatch();

  //   if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Contact & Social Links</h1>

      <Card>
        <CardHeader className="font-semibold">
          Edit Contact Information
        </CardHeader>
        <CardContent>
          <ContactForm initialData={data} />
        </CardContent>
      </Card>
    </div>
  );
}
