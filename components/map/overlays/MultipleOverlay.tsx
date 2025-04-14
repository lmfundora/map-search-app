"use client";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import { useEffect, useState } from "react";

const MultipleOverlay = () => {
  const [overlayDiv, setOverlayDiv] = useState<HTMLElement | null>(null);
  let close;

  const { map } = useMapContext();
  useEffect(() => {
    if (overlayDiv && map) {
      close = map.setOverlay({
        id: "multiple",
        htmlElement: overlayDiv,
      });
    }
  }, [map]);

  return (
    <div
      ref={(div) => setOverlayDiv(div)}
      className="h-20 w-40 bg-white ol-popup"
    >
      <p className="text-black">
        En este punto se encuentran varios puntos, amplie el mapa para verlos.
      </p>
    </div>
  );
};

export default MultipleOverlay;
