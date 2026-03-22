"use client";

import { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const GeminiIcon = () => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
  >
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
      fill="url(#gemini-grad)"
    />
  </svg>
);

const SUGGESTIONS: string[] = [
  "Tech stack?",
  "Hardest bug?",
  "Features?",
  "How it works?",
];

interface GeminiChatInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  disabled?: boolean;
}

export default function GeminiChatInput({
  value = "",
  onChange,
  onSubmit,
  onSuggestionClick,
  disabled = false,
}: GeminiChatInputProps) {
  const [localValue, setLocalValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentValue = onChange ? value : localValue;
  const setCurrentValue = onChange ? onChange : setLocalValue;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setCurrentValue(e.target.value);
    const el = e.target;
    el.style.height = "40px";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (!currentValue.trim() || disabled) return;
    onSubmit?.(currentValue);
    if (!onChange) setCurrentValue("");
    if (textareaRef.current) textareaRef.current.style.height = "40px";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full p-4 shrink-0">
      <div className="flex flex-col gap-2">
        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-1.5 px-0.5">
          {SUGGESTIONS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onSuggestionClick?.(label)}
              className={cn(
                "text-[10px] sm:text-xs px-2.5 py-1 rounded-full whitespace-nowrap",
                "border border-border/50 bg-muted/30 text-muted-foreground",
                "hover:bg-muted/50 hover:border-border hover:text-foreground",
                "transition-all duration-200",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div
          className={cn(
            "relative flex items-end bg-muted/30 rounded-md",
            "ring-1 ring-border/50 focus-within:ring-border focus-within:bg-muted/40",
            "transition-all duration-200",
          )}
        >
          {/* Gemini icon */}
          <div className="absolute left-3 bottom-3 pointer-events-none">
            <GeminiIcon />
          </div>

          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask Gemini about this project"
            rows={1}
            disabled={disabled}
            className={cn(
              "w-full bg-transparent pl-10 pr-12 py-2.5 text-sm",
              "placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0",
              "resize-none overflow-y-auto border-0 shadow-none",
              "min-h-[40px] max-h-[80px]",
            )}
            style={{ height: "40px" }}
          />

          {/* Submit button */}
          <Button
            type="button"
            onClick={() => handleSubmit({} as any)}
            disabled={!currentValue.trim() || disabled}
            size="icon"
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 size-8",
              "bg-foreground text-background hover:bg-foreground/90",
              "disabled:cursor-not-allowed shadow-sm rounded-md",
              "transition-opacity duration-200",
            )}
            style={{ opacity: currentValue.trim() && !disabled ? 1 : 0.3 }}
          >
            <ArrowUp className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
