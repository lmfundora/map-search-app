import { local } from "@/lib/types";
import Image from "next/image";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const bucket = "/locals-image//";

const LocalesCard = ({ local }: { local: local }) => {
  https: return (
    <div className="h-60 w-48 rounded-lg my-2 card-shadow bg-gray-100">
      <div className="w-full h-30 relative">
        <Image
          src={storageUrl + bucket + local.image}
          alt="Local image"
          fill
          quality={50}
          sizes="(min-width: 200px) 150vw, 200px"
          className="w-full object-cover min-w-36 min-h-20 rounded-t-lg"
        />
      </div>
      <p>{local.name}</p>
    </div>
  );
};

export default LocalesCard;
