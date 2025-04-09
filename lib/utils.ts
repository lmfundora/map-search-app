import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { local } from "./types";
import { layerData } from "@/components/map/customMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractLocalesData(data: local[]): layerData[] {
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
