"use client";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Copy, Check as CheckIcon, AlignLeft } from "lucide-react";

interface JsonEditorProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const JsonEditor = ({
  value,
  onChange,
  className = "",
}: JsonEditorProps) => {
  const [copied, setCopied] = useState(false);
  const lineNumbers = value.split("\n").length;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value);
      if (parsed) {
        const formatted = JSON.stringify(parsed, null, 2);
        onChange(formatted);
      }
    } catch (e) {
      alert("Cannot format invalid JSON");
    }
  };

  return (
    <div className={`prism-editor-wrapper relative group ${className}`}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          JSON Editor
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFormat}
            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Format JSON"
          >
            <AlignLeft size={12} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckIcon size={12} className="text-emerald-500" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        </div>
      </div>
      <div className="prism-editor-container max-h-[400px] overflow-auto">
        <div className="prism-line-numbers">
          {Array.from({ length: lineNumbers }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(code) => {
            const lang = Prism.languages.json || {};
            return Prism.highlight(code, lang, "json");
          }}
          padding={16}
          className="prism-editor"
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
};
