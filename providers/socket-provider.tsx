// providers/socket-provider.tsx
"use client";

import { createContext, useContext, useEffect } from "react";
import { getSocket } from "@/lib/socket";

const SocketContext = createContext<ReturnType<typeof getSocket> | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = getSocket();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket must be used inside SocketProvider");
  }
  return ctx;
};
