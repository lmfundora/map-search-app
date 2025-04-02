"use client";

import { useEffect, useState } from "react";
import { useMap } from "./useMap";
import CustomMap from "./customMap";
import { getLocales } from "@/lib/client/getLocales";
import type { layerData } from "./customMap";
import { selectStyle } from "@/lib/layerStyles/points";

type local = {
  id: number;
  name: string;
  image: string;
  slogan: string;
  created_at: string;
  x: number;
  y: number;
};

const api = async () => {
  await getLocales();
};

function extrctData<layerData>(data: local[]) {
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

const Map = () => {
  const [mapDiv, setMapState] = useState<HTMLDivElement | null>();
  const [map, setMap] = useState<CustomMap | null>(null);
  const [response, setResponse] = useState<local[] | null>(null);

  useEffect(() => {
    const api = async () => {
      const r = await getLocales();
      setResponse(r.data);
    };
    api();

    if (mapDiv) {
      const map = useMap(mapDiv);
      setMap(map);
    }
  }, [mapDiv]);

  useEffect(() => {
    console.log(response);
    if (response) {
      map?.drawPoints({
        data: extrctData(response),
        layerId: "points",
        setStyle: selectStyle,
      });
    }
  }, [response]);

  return (
    <>
      <div className="w-full h-full" ref={(map) => setMapState(map)}></div>
    </>
  );
};

export default Map;
