"use client";

import { createContext, use } from "react";
import type { ChatMessage } from "./use-chat";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
}

interface ChatActions {
  sendMessage: (content: string) => void;
  stopGeneration: () => void;
  reset: () => void;
}

export interface ChatContextValue {
  state: ChatState;
  actions: ChatActions;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const context = use(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }

  return context;
}

export { ChatContext as ChatContextProvider };
