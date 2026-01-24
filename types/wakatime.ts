export type WakaTimeSource = "live" | "cache";

export type WakaTimeEditorName = "VS Code" | "Cursor";

export type WakaTimeEditor = {
  name: WakaTimeEditorName;
  text: string; // "51 mins"
  total_seconds: number; // 3100.755
};

export type WakaTimeCombined = {
  total_seconds: number; // 3100.755
  text: string; // "51m"
};

export type WakaTimeYesterdayResponse = {
  source: WakaTimeSource;
  date: string | null; // "2026-01-23"
  combined: WakaTimeCombined;
  editors: WakaTimeEditor[];
};
