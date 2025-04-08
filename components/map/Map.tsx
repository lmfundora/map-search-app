"use client";

import { getLocales } from "@/lib/client/getLocales";
import { selectStyle } from "@/lib/layerStyles/points";
import type { local } from "@/lib/types";
import { use, useEffect, useState } from "react";
import type { layerData } from "./customMap";
import CustomMap from "./customMap";
import { useMap } from "./useMap";
import { useMapContext } from "../providers/contexts/MapContext";

function extrctData(data: local[]): layerData[] {
  return data.map((item) => ({
    props: {
      id: item.id,
      name: item.name,
      image: item.image,
      slogan: item.slogan,
      created_at: item.created_at,
    },
    coords: [item.x, item.y],
  }));
}

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
        data: extrctData(response.data),
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
