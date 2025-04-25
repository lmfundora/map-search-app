import { local } from "@/lib/types";
import { Clock, Map, Phone } from "lucide-react";
import Image from "next/image";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const bucket = "/locals-image//";

const LocalesCard = ({ local }: { local: local }) => {
  return (
    <div className="h-fit min-h-48 w-full flex rounded-lg card-shadow bg-muted">
      <div className="w-2/5 h-full relative">
        <Image
          src={storageUrl + bucket + local.image}
          alt="Local image"
          fill
          quality={50}
          sizes="(min-width: 150px) 200vw, 150px"
          className="w-full max-h-60 min-h-48 object-cover rounded-s-lg"
        />
      </div>
      <div className="px-4 py-4 text-tprimary w-3/5 flex flex-col">
        <h6 className="font-bold text-lg/5">{local.name.toUpperCase()}</h6>
        <p className="text-tsecondary">{local.slogan}</p>
        <div className="grow items-center mt-3">
          <div className="flex flex-col h-full gap-2 justify-center">
            <div className="flex items-center gap-1">
              <Phone size={15} />
              <p className="text-sm text-tprimary">{local.contacto}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={15} />
              <p className="text-sm text-tsecondary">{local.horario}</p>
            </div>
            <div className="flex cursor-pointer text-start w-10/12 overflow-hidden gap-1">
              <Map size={15} />
              <p className="text-xs text-tsecondary">{local.direccion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalesCard;
