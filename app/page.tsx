"use client";
import CustomList from "@/components/customList/CustomList";
import LocalesCard from "@/components/localesCard/LocalesCard";
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
import { useEffect, useState } from "react";

import MyDialog from "@/components/customDialog/MyDialog";
import ProductsCard from "@/components/productsCard/ProductsCard";

const layerId = "points";

export default function Home() {
  const placeholders = ["Refresco de cola", "Cerma de piel", "Jamón cerrano"];
  const [loading, setLoading] = useState(false);
  const [locales, setLocales] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const { map } = useMapContext();
  const placeholder = usePlaceholderAnimation(placeholders);

  async function handleSearch(name: string) {
    setLoading(true);
    let response;
    try {
      response = await getLocalsAndProductsByProductName(name);
    } catch (error) {
      setLoading(false);
      handleErrors(error as AxiosError);
    }

    const data = extractLocalesData({
      data: response.data.localesDisponibles,
      layerId: layerId,
    });

    setProducts(response.data.productosEncontrados);

    map?.drawPoints({
      data: data,
      layerId: layerId,
      setStyle: selectStyle,
    });
    setDialogOpen(true);
    setLoading(false);
  }

  async function drawLocales() {
    let response;
    try {
      response = await getLocales();
      setLocales(response.data);
    } catch (error) {
      handleErrors(error as AxiosError);
    }
    map?.drawPoints({
      data: extractLocalesData({ data: response.data, layerId }),
      layerId: layerId,
      setStyle: selectStyle,
    });
  }

  useEffect(() => {
    drawLocales();
  }, [map]);

  return (
    <div className="w-screen h-screen flex overflow-hidden relative">
      <div className="w-full h-full relative">
        <Map />
        <SearchBar
          className="absolute top-2 bg-white mx-[2.5%] w-[95%] shadow-lg"
          placeholder={placeholder}
          loading={loading}
          action={handleSearch}
          onClose={() => {
            drawLocales();
            setDialogOpen(false);
          }}
        />
      </div>
      <div className="w-1/2 h-screen bg-muted flex flex-col">
        <h3 className="text-tprimary text-2xl font-bold mx-4 mt-2">Locales</h3>
        <CustomList
          items={locales}
          className="w-full h-full px-4"
          renderItem={(item) => <LocalesCard local={item} />}
        />
      </div>
      <MyDialog
        open={isDialogOpen}
        close={() => setDialogOpen(false)}
        className="w-1/3 h-screen bg-muted absolute right-0"
      >
        <h3 className="text-tprimary text-2xl font-bold mx-4 mt-2">
          Productos
        </h3>
        <CustomList
          items={products}
          className="w-full h-full px-4 pb-12"
          renderItem={(item) => <ProductsCard local={item} />}
        />
      </MyDialog>
    </div>
  );
}
