"use client";
import Map from "@/components/map/Map";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import SearchBar from "@/components/searchBar/SearchBar";
import { getLocales } from "@/lib/client/getLocales";

import { getLocalsAndProductsByProductName } from "@/lib/client/getLocalsAndProductsByProductName";
import { handleErrors } from "@/lib/hooks/handleErrors";
import { usePlaceholderAnimation } from "@/lib/hooks/usePlaceholderAnimation";
import { selectStyle } from "@/lib/layerStyles/points";
import { extractLocalesData } from "@/lib/utils";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Home() {
  const placeholders = ["Refresco de cola", "Cerma de piel", "Jamón cerrano"];
  const [loading, setLoading] = useState(false);

  const { map } = useMapContext();
  const placeholder = usePlaceholderAnimation(placeholders);

  async function handleSearch(name: string) {
    setLoading(true);
    let response;
    try {
      response = await getLocalsAndProductsByProductName(name);
    } catch (error) {
      handleErrors(error as AxiosError);
    }

    const data = extractLocalesData(response.data.localesDisponibles);

    map?.drawPoints({
      data: data,
      layerId: "points",
      setStyle: selectStyle,
    });
    setLoading(false);
  }

  async function drawLocales() {
    let response;
    try {
      response = await getLocales();
    } catch (error) {
      handleErrors(error as AxiosError);
    }
    map?.drawPoints({
      data: extractLocalesData(response.data),
      layerId: "points",
      setStyle: selectStyle,
    });
  }

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-full h-full relative">
          <Map />
          <SearchBar
            className="absolute top-2 bg-white mx-[2.5%] w-[95%] shadow-lg"
            placeholder={placeholder}
            loading={loading}
            action={handleSearch}
            onClose={() => drawLocales()}
          />
        </div>
        <div className="w-1/2 h-screen">
          <p>Workin on it</p>
        </div>
      </div>
    </>
  );
}
