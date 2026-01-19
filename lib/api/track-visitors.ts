import { api } from "../axios";
export const trackVisitor = async (page: string) => {
  try {
    await api.post("/send", { page });
  } catch {}
};
