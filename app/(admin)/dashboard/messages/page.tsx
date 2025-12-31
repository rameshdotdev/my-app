"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/hooks";
import { getMessages } from "@/store/features/messageSlice";
import { Message } from "@/types/type";

export default function MessagesPage() {
  const messages = useAppSelector(getMessages);
  return (
    <div className="space-y-6 p-6">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2">
        <Mail className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <Separator />

      {/* ===== Messages List ===== */}
      <div className="space-y-4">
        {messages &&
          messages.map((msg: Message, idx: number) => (
            <Card key={idx} className="transition hover:shadow-sm">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar>
                  <AvatarFallback>
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-sm text-muted-foreground">{msg.email}</p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-relaxed text-foreground">
                  {msg.message}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* ===== Empty State ===== */}
      {messages.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          No messages yet
        </div>
      )}
    </div>
  );
}
