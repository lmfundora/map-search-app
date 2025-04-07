"use client";
import Map from "@/components/map/Map";
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
import { usePlaceholderAnimation } from "@/lib/hooks/usePlaceholderAnimation";

export default function Home() {
  const placeholders = ["Refresco de cola", "Cream de piel"];

  const placeholder = usePlaceholderAnimation(placeholders);

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-full h-full relative">
          <Map />
          <SearchBar
            className="absolute top-2 right-2 bg-white w-[90%]"
            placeholder={placeholder}
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
