// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { API_URL } from "./env";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(API_URL!, {
      autoConnect: false,
    });
  }
  return socket;
};
