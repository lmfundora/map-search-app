"use client";

import { getLocales } from "@/lib/client/getLocales";
import { selectStyle } from "@/lib/layerStyles/points";
import { use, useEffect, useState } from "react";
import { useMap } from "./useMap";
import { useMapContext } from "../providers/contexts/MapContext";
import { extractLocalesData } from "@/lib/utils";
import PointOverlay from "./overlays/PointOverlay";
import MultipleOverlay from "./overlays/MultipleOverlay";

const localesPromise = getLocales();
const layerId = "points";

const Map = () => {
  const [mapDiv, setMapState] = useState<HTMLDivElement | null>();
  const { map, setMap } = useMapContext();

  const response = use(localesPromise) ?? { data: [] };

  useEffect(() => {
    if (mapDiv) {
      const map = useMap(mapDiv);
      setMap(map);
    }
  }, [mapDiv]);

  useEffect(() => {
    if (response) {
      map?.drawPoints({
        data: extractLocalesData({ data: response.data, layerId }),
        layerId: layerId,
        setStyle: selectStyle,
      });
    }
  }, [map]);

  return (
    <>
      <div className="w-full h-full" ref={(map) => setMapState(map)}></div>
      <PointOverlay />
      <MultipleOverlay />
    </>
  );
};

export default Map;
