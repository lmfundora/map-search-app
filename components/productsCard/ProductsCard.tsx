import { Phone, Clock } from "lucide-react";
import Image from "next/image";
import { useMapContext } from "../providers/contexts/MapContext";

type Props = {
  local_id: String;
  price: Number;
  stock: String;
  productos: {
    name: String;
    description: String;
    brand: String;
    image: String;
  };
};
const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const bucket = "/products-images//";

const ProductsCard = ({ local }: { local: Props }) => {
  const { map } = useMapContext();
  return (
    <div
      className="h-fit min-h-48 w-full flex rounded-lg card-shadow bg-muted cursor-pointer"
      onClick={() => {
        map?.highlightPoint(local.local_id);
      }}
    >
      <div className="w-2/5 h-full relative">
        <Image
          src={storageUrl + bucket + local.productos.image}
          alt="Product image"
          fill
          quality={50}
          sizes="(min-width: 150px) 200vw, 150px"
          className="w-full max-h-60 min-h-48 object-cover rounded-s-lg"
        />
      </div>
      <div className="px-4 py-4 text-tprimary w-3/5 flex flex-col">
        <h6 className="font-bold text-lg/5">
          {local.productos.name.toUpperCase()}
        </h6>
        <p className="text-sm text-tsecondary">By: {local.productos.brand}</p>
        <div className="grow mt-4">
          <div className="flex flex-col h-full gap-2 justify-between">
            <p className="text-tsecondary">{local.productos.description}</p>
            <div className="flex items-baseline gap-1 justify-end">
              <p className="text-xl lg:text-2xl font-bold text-tprimary">
                {local.price.toString()}
              </p>
              <p className="text-sm text-tprimary">cup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
