"use client";

import { useEffect, useState } from "react";
import { useMap } from "./useMap";
import { useMapContext } from "../providers/contexts/MapContext";
import PointOverlay from "./overlays/PointOverlay";
import MultipleOverlay from "./overlays/MultipleOverlay";

const Map = () => {
  const [mapDiv, setMapState] = useState<HTMLDivElement | null>();
  const { setMap } = useMapContext();

  useEffect(() => {
    if (mapDiv) {
      const map = useMap(mapDiv);
      setMap(map);
    }
  }, [mapDiv]);

  return (
    <>
      <div className="w-full h-full" ref={(map) => setMapState(map)}></div>
      <PointOverlay />
      <MultipleOverlay />
    </>
  );
};

export default Map;
