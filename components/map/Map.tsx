"use client";

import { getLocales } from "@/lib/client/getLocales";
import { selectStyle } from "@/lib/layerStyles/points";
import { use, useEffect, useState } from "react";
import { useMap } from "./useMap";
import { useMapContext } from "../providers/contexts/MapContext";
import { extractLocalesData } from "@/lib/utils";

const localesPromise = getLocales();

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
        data: extractLocalesData(response.data),
        layerId: "points",
        setStyle: selectStyle,
      });
    }
  }, [map]);

  return (
    <>
      <div className="w-full h-full" ref={(map) => setMapState(map)}></div>
    </>
  );
};

export default Map;
