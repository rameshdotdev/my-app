"use client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WifiOff } from "lucide-react";
import { DiVisualstudio } from "react-icons/di";
import { useSound } from "@/hooks/use-sound";
import {
  getYesterdayData,
  setYesterdayWorks,
} from "@/store/features/wakatimeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useFetch } from "@/hooks/use-fetch";
import { WakaTimeYesterdayResponse } from "@/types/wakatime";
import { useEffect } from "react";
export default function OfflineStatusTooltip() {
  const { data: incomingData } = useFetch<WakaTimeYesterdayResponse>(
    "/worked-for/yesterday",
    {
      revalidate: 120,
      tags: ["wakatime"],
    },
  );
  const dispatch = useAppDispatch();
  const data = useAppSelector(getYesterdayData);
  const { play } = useSound();
  const yesterdayText = data?.combined?.text;
  const editors = data?.editors;
  useEffect(() => {
    if (incomingData) {
      dispatch(setYesterdayWorks(incomingData));
    }
  }, [incomingData, dispatch]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onMouseEnter={() => play("hover")}
          className="hidden md:flex absolute -bottom-2 -right-2 w-6 h-6 bg-background border-2 border-border rounded-full items-center justify-center shadow-lg group-hover:scale-110 [@media(hover:hover)_and_(pointer:fine)]:transition-transform [@media(hover:hover)_and_(pointer:fine)]:duration-200 [@media(hover:hover)_and_(pointer:fine)]:ease-[ease] [@media(hover:hover)_and_(pointer:fine)]:will-change-transform"
        >
          <div className="w-2 h-2 bg-muted-foreground rounded-full" />
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        align="start"
        sideOffset={12}
        className="p-3 min-w-62 border border-border shadow-lg rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-foreground truncate flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-muted-foreground" />
            <span>Offline in code editor</span>
          </div>

          <p className="text-sm text-foreground">
            Yesterday worked <b>{yesterdayText}</b>
          </p>

          {editors.length > 0 && (
            <div className="mt-1 space-y-1">
              {editors.map((e) => (
                <div
                  key={e.name}
                  className="flex items-center justify-between text-xs text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    {e.name === "Cursor" ? (
                      <Image
                        alt="Cursor"
                        src="/images/cursor.webp"
                        width={14}
                        height={14}
                        className="rounded-sm"
                      />
                    ) : (
                      <DiVisualstudio className="h-3.5 w-3.5" />
                    )}
                    <span>{e.name}</span>
                  </div>
                  <span className="text-foreground">{e.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
