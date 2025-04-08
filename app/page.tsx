"use client";
import Map from "@/components/map/Map";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import SearchBar from "@/components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getLocalsAndProductsByProductName } from "@/lib/client/getLocalsAndProductsByProductName";
import { handleErrors } from "@/lib/hooks/handleErrors";
import { usePlaceholderAnimation } from "@/lib/hooks/usePlaceholderAnimation";
import { selectStyle } from "@/lib/layerStyles/points";
import { AxiosError } from "axios";

export default function Home() {
  const placeholders = ["Refresco de cola", "Cerma de piel", "Jamón cerrano"];

  const { map } = useMapContext();
  const placeholder = usePlaceholderAnimation(placeholders);

  async function handleSearch(name: string) {
    let response;
    try {
      response = await getLocalsAndProductsByProductName(name);

      // Nedd to improve this part
      const data = response.data.localesDisponibles.map((item: any) => ({
        props: {
          id: item.id,
        },
        coords: [item.x, item.y],
      }));
      map?.drawPoints({
        data: data,
        layerId: "points",
        setStyle: selectStyle,
      });
    } catch (error) {
      handleErrors(error as AxiosError);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-full h-full relative">
          <Map />
          <SearchBar
            className="absolute top-2 bg-white mx-[2.5%] w-[95%]"
            placeholder={placeholder}
            action={(q) => {
              handleSearch(q);
            }}
          />
        </div>
        <div className="w-1/2 h-screen">
          <Drawer direction="right">
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
