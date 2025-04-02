"use client";

import { useEffect, useState } from "react";
import { useMap } from "./useMap";

const Map = () => {
  const [mapDiv, setMapState] = useState<HTMLDivElement | null>();

  useEffect(() => {
    if (mapDiv) {
      useMap(mapDiv);
    }
  }, [mapDiv]);

  return (
    <>
      <div className="w-full h-full" ref={(map) => setMapState(map)}></div>
    </>
  );
};

export default Map;
