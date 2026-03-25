"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import type { ChatMessage, ProjectContext } from "./use-chat";
import { ChatContext, useChat as useChatContext } from "./chat-context"; // context
import { useChat as useChatHook } from "./use-chat"; // logic
const springTransition = { type: "spring", bounce: 0, duration: 0.3 } as const;

interface ChatProviderProps {
  projectContext?: ProjectContext;
  onFirstMessage?: () => void;
  children: React.ReactNode;
}

function ChatProvider({
  projectContext,
  onFirstMessage,
  children,
}: ChatProviderProps) {
  const chat = useChatHook({
    onFirstMessage,
    projectContext,
  });

  return (
    <ChatContext
      value={{
        state: {
          messages: chat.messages,
          isLoading: chat.isLoading,
        },
        actions: {
          sendMessage: chat.sendMessage,
          stopGeneration: chat.stopGeneration,
          reset: chat.reset,
        },
      }}
    >
      {children}
    </ChatContext>
  );
}

function GeminiLogo({ className }: { className?: string }) {
  const id = React.useId();

  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={`gemini-grad-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#4285F4">
            <animate
              attributeName="stop-color"
              values="#4285F4;#EA4335;#FBBC05;#34A853;#4285F4"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#9B72CB">
            <animate
              attributeName="stop-color"
              values="#9B72CB;#D96570;#F9AB00;#0F9D58;#9B72CB"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#D96570">
            <animate
              attributeName="stop-color"
              values="#D96570;#FBBC05;#34A853;#4285F4;#D96570"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
        fill={`url(#gemini-grad-${id})`}
      />
    </svg>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className="flex justify-start"
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-muted/30">
        <GeminiLogo className="size-4" />
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 rounded-full bg-muted-foreground/60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-3.5 py-2 rounded-lg text-sm bg-muted/50">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.isStreaming && !message.content) {
    return <ThinkingIndicator />;
  }

  return (
    <div className="flex justify-start">
      <div className="px-3.5 py-2.5 rounded-lg bg-muted/30 text-sm max-w-[85%]">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="leading-relaxed not-first:mt-2">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mt-2 space-y-1">
                {children}
              </ol>
            ),
            code: ({ children }) => (
              <code className="bg-background/50 px-1.5 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-background/50 p-3 rounded-md mt-2 overflow-x-auto text-xs">
                {children}
              </pre>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        {message.isStreaming && message.content && (
          <motion.span
            className="inline-block w-1.5 h-4 ml-0.5 bg-foreground/70 rounded-sm align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ChatMessages() {
  const { state } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages]);

  return (
    <div className="flex-1">
      <div ref={scrollRef} className="h-full p-4">
        <div className="flex flex-col gap-3">
          {state.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ChatInputProps {
  placeholder?: string;
  autoFocus?: boolean;
}

function ChatInput({ placeholder = "Ask Gemini", autoFocus }: ChatInputProps) {
  const { state, actions } = useChatContext();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSubmit = input.trim() && !state.isLoading;

  const suggestedPrompts = [
    "Tech stack?",
    "Hardest bug?",
    "Features?",
    "How it works?",
  ];

  useEffect(() => {
    if (autoFocus && !state.isLoading) {
      textareaRef.current?.focus();
    }
  }, [autoFocus, state.isLoading, state.messages.length]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "inherit";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (input.trim() && !state.isLoading) {
        actions.sendMessage(input.trim());
        setInput("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "inherit";
        }
        requestAnimationFrame(() => {
          textareaRef.current?.focus();
        });
      }
    },
    [input, state.isLoading, actions],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {state.messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex flex-wrap gap-1.5 px-0.5"
          >
            {suggestedPrompts.map((prompt, i) => (
              <motion.button
                key={prompt}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springTransition, delay: i * 0.05 }}
                onClick={() => actions.sendMessage(prompt)}
                className={cn(
                  "text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-border/50",
                  "bg-muted/30 hover:bg-muted/50 hover:border-border",
                  "text-muted-foreground hover:text-foreground",
                  "transition-all duration-200 whitespace-nowrap",
                )}
              >
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "relative flex items-end",
            "bg-muted/30 rounded-md",
            "ring-1 ring-border/50",
            "focus-within:ring-border focus-within:bg-muted/40",
            "transition-all duration-200",
          )}
        >
          <div className="absolute left-3 bottom-3 pointer-events-none">
            <GeminiLogo className="size-4" />
          </div>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent",
              "pl-10 pr-12 py-2.5 text-sm",
              "placeholder:text-muted-foreground/50",
              "focus:outline-none",
              "resize-none overflow-y-auto",
              "min-h-[40px] max-h-[80px]",
            )}
          />
          <motion.button
            type="submit"
            disabled={!canSubmit}
            initial={false}
            animate={{
              opacity: canSubmit ? 1 : 0.3,
            }}
            whileHover={canSubmit ? { scale: 1.05 } : undefined}
            whileTap={canSubmit ? { scale: 0.95 } : undefined}
            transition={springTransition}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2",
              "size-8 flex items-center justify-center",
              "rounded-md",
              "bg-foreground text-background",
              "disabled:cursor-not-allowed",
              "shadow-sm",
            )}
          >
            <ArrowUp className="size-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </form>
    </div>
  );
}

function ChatInputWrapper({ children }: { children: React.ReactNode }) {
  return <div className="p-4 lg:p-6 shrink-0">{children}</div>;
}

export const ProjectCard = {
  ChatProvider,
  ChatMessages,
  ChatInput,
  ChatInputWrapper,
};
