"use client";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import { useEffect, useState } from "react";
import { overlayData } from "../customMap";

const PointOverlay = () => {
  const [overlayDiv, setOverlayDiv] = useState<HTMLElement | null>(null);
  const [data, setData] = useState<overlayData>();
  let close;

  const { map } = useMapContext();
  useEffect(() => {
    if (overlayDiv && map) {
      close = map.setOverlay({
        id: "points",
        htmlElement: overlayDiv,
        setData: (data) => setData(data),
      });
    }
  }, [map]);

  return (
    <div
      ref={(div) => setOverlayDiv(div)}
      className="h-20 w-40 bg-white ol-popup"
    >
      <p className="text-black">{data?.value.id}</p>
    </div>
  );
};

export default PointOverlay;
