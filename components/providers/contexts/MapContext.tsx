"use client";
import CustomMap from "@/components/map/customMap";
import { createContext, useContext, useState } from "react";

interface MapContextType {
  map: CustomMap | null;
  setMap: (map: CustomMap) => void;
}

const initialMapContext: MapContextType = {
  map: null,
  setMap: (map: CustomMap) => {},
};

export const MapContext = createContext<MapContextType>(initialMapContext);

export const MapContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [map, setMap] = useState<CustomMap | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};
