"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

const CalendarButton = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <Button
      asChild
      className="w-full sm:w-auto cursor-pointer rounded-[8px] transition-all duration-300 group/call"
      data-cal-namespace="15min"
      data-cal-link="ramesh.in/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      <div>
        {/* Icon animation container */}
        <div className="relative w-4 h-4 overflow-hidden">
          {/* First icon - slides up on hover */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="absolute inset-0 transition-transform duration-400 ease-out  group-hover/call:-translate-y-6"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4zM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3zm344-208a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24z"></path>
          </svg>

          {/* Second icon - slides in from bottom on hover */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="absolute inset-0 translate-y-6 transition-transform duration-400 ease-out  group-hover/call:translate-y-0"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4zM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3zm344-208a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm-80-80a24 24 0 1 1-24 24 24 24 0 0 1 24-24zm0 80a24 24 0 1 1-24 24 24 24 0 0 1 24-24z"></path>
          </svg>
        </div>
        Book an intro call
      </div>
    </Button>
  );
};

export default CalendarButton;
