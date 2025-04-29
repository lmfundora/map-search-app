"use client";
import { useMapContext } from "@/components/providers/contexts/MapContext";
import { useEffect, useState } from "react";
import { Phone, Clock, Map } from "lucide-react";
import Image from "next/image";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const bucket = "/locals-image//";

const PointOverlay = () => {
  const [overlayDiv, setOverlayDiv] = useState<HTMLElement | null>(null);
  const [data, setData] = useState<any>();

  const { map } = useMapContext();
  useEffect(() => {
    if (overlayDiv && map) {
      map.setOverlay({
        id: "points",
        htmlElement: overlayDiv,
        setData: (data) => setData(data),
      });
    }
  }, [map]);

  return (
    <div
      ref={(div) => setOverlayDiv(div)}
      className={`${map && " h-44 w-[350px] flex bg-white ol-popup relative"}`}
    >
      {map && (
        <>
          <div className="w-2/5 h-full relative">
            <Image
              src={storageUrl + bucket + data?.image}
              placeholder="blur"
              blurDataURL="/V+shopping cart.jpeg"
              alt="Local image"
              fill
              quality={50}
              sizes="(min-width: 150px) 200vw, 150px"
              className="w-full min-h-38 object-cover rounded-s-lg"
            />
          </div>
          <div className="px-4 py-4 text-tprimary w-3/5 flex flex-col">
            <h6 className="font-bold text-md/5">{data?.name.toUpperCase()}</h6>
            <div className="grow items-center mt-2">
              <div className="flex flex-col h-full gap-2 justify-center">
                <div className="flex items-center gap-1">
                  <Phone size={15} />
                  <p className="text-sm text-tprimary">{data?.contacto}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={15} />
                  <p className="text-xs text-tsecondary">{data?.horario}</p>
                </div>
                <div className="flex cursor-pointer text-start w-10/12 overflow-hidden gap-1">
                  <Map size={15} />
                  <p className="text-xs text-tsecondary">{data?.direccion}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PointOverlay;
