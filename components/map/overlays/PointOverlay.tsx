"use client";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import { useEffect, useState } from "react";

const PointOverlay = () => {
  const [overlayDiv, setOverlayDiv] = useState<HTMLElement | null>(null);

  const { map } = useMapContext();
  useEffect(() => {
    if (overlayDiv && map) {
      map.setOverlay({ id: "points", htmlElement: overlayDiv });
    }
  }, [map]);

  return <div ref={(div) => setOverlayDiv(div)}>PointOverlay</div>;
};

export default PointOverlay;
