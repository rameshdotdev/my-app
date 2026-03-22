"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Mail } from "lucide-react";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import ProjectActionsBtn from "../../components/action-btn-project";
import { StatusDot } from "../../components/status-dot";
import ProjectTeckStackChips from "../../components/project-teck-stack";

import { useAppSelector } from "@/hooks/hooks";
import { selectProjectById } from "@/store/features/projectSlice";

import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import Title from "../../components/title";
import GeminiChatInput from "../../../../components/gemini-chat-area";

export default function Page() {
  const params = useParams<{ id: string }>();
  const project = useAppSelector(selectProjectById(params.id));
  if (!project) return notFound();
  const [showTeckStack, setShowTeckStack] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; role: "user" | "assistant"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: input.trim(),
    };

    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: "",
    };

    if (input.toLowerCase().includes("tech stack")) {
      setShowTeckStack(true);
      setIsLoading(false);
      setInput("");
      return;
    }
    const updatedMessages = [...messages, userMessage, assistantMessage];
    setMessages(updatedMessages);

    const payload = {
      projectContext: {
        title: project.title,
        excerpt: project.description?.join(" ") || "",
        github: project.links.github,
      },
      id: params.id,
      messages: updatedMessages
        .filter((msg) => msg.role !== "assistant")
        .map((msg) => ({
          parts: [{ type: "text", text: msg.content }],
          id: msg.id,
          role: msg.role,
        })),
      trigger: "submit-message",
    };

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const event = JSON.parse(data);
              if (event.type === "text-delta") {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessage.id
                      ? { ...msg, content: msg.content + event.delta }
                      : msg,
                  ),
                );
              }
            } catch (e) {
              // ignore
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: "Sorry, something went wrong." }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const onSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => onSubmit(), 0);
  };

  return (
    <>
      <Title title="Projects" isSubPage />

      <VerticalDashedBorderLayout className="p-0">
        <div className="flex flex-col items-start">
          {/* Media */}
          <div className="px-4 w-full p-4">
            <div className="w-full h-full md:min-h-85 min-h-60 rounded-[8px] relative border border-border p-1.5 overflow-hidden">
              {/* Light */}
              <Image
                alt={project.title}
                src={project.image.light.url}
                width={1000}
                height={1000}
                priority={false}
                className="block dark:hidden w-full object-cover md:h-105 h-60 rounded-[8px] border border-border"
              />

              {/* Dark */}
              <Image
                alt={project.title}
                src={project.image.dark.url}
                width={1000}
                height={1000}
                priority={false}
                className="hidden dark:block w-full object-cover md:h-105 h-60 rounded-[8px] border border-border"
              />
            </div>
          </div>

          <ProjectActionsBtn
            githubUrl={project.links.github}
            websiteUrl={project.links.site}
            postUrl={project.links.post}
          />

          {/* Content */}
          <div className="flex flex-col w-full gap-1.5 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.40rem] font-bold leading-tight text-title">
                {project.title}
              </h1>

              <StatusDot status={project.status} hotspot />
            </div>

            <div className="text-base text-foreground [&>p]:mb-3 [&>p:last-child]:mb-0">
              {project.description?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Optional: show contact only when building */}
            {project.status === "building" && (
              <div className="flex items-center gap-1">
                <p className="text-foreground flex items-center gap-1">
                  For early access, please{" "}
                  <a
                    className="group text-strong transition-colors duration-300 inline-flex items-center"
                    href="mailto:ittsramesh.com"
                  >
                    <span className="relative">
                      contact me!
                      <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </span>
                    <Mail className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-4 w-4" />
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* dashed divider */}
          <HorizontalDashedBorder />
          {showTeckStack && <ProjectTeckStackChips stack={project.stack} />}
          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="w-full px-4 pt-2 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted text-muted-foreground text-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Input */}
          <GeminiChatInput
            value={input}
            onChange={setInput}
            onSubmit={onSubmit}
            onSuggestionClick={onSuggestionClick}
            disabled={isLoading}
          />
        </div>
      </VerticalDashedBorderLayout>
    </>
  );
}
