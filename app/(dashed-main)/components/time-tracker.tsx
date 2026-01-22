

import { useEffect, useState } from "react";

export const TimeTracker = () => {

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/wakatime");
      const data = await res.json();

     console.log(data)
    };

    load();
  }, []);

  // return (
  //   <div>
  //     <h2>WakaTime Tracker</h2>
     
  //   </div>
  // );
};
