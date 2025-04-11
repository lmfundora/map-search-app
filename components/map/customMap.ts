import { MapOptions } from "ol/Map";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import GeoJSON from "ol/format/GeoJSON.js";
import { Cluster } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { linear } from "ol/easing";
import { MapBrowserEvent, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";

export type overlayData = {
  value: any | null;
  features: FeatureLike[] | null;
};

export type layerData = {
  props: any;
  coords: number[];
};

export type drawPointsProps = {
  data: layerData[];
  layerId: string;
  setStyle: (feature: any) => Style;
};

class CustomMap extends Map {
  constructor(options: MapOptions) {
    super(options);
  }

  public drawPoints({ data, layerId, setStyle }: drawPointsProps) {
    const map = this;

    this.removeAllLayers();
    if (data.length === 0) return;

    // this.hideOverlays();
    let gjson = {
      type: "FeatureCollection",
      name: "ptahorasi",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::3857" } },
      features: data.map((d) => ({
        type: "Feature",
        id: d.props?.id,
        properties: d.props,

        geometry: {
          type: "Point",
          coordinates: d.coords,
        },
      })),
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(gjson),
    });
    const clusterSource = new Cluster({
      distance: 20,
      minDistance: 0,
      source: vectorSource,
    });
    const puntos = new VectorLayer({
      source: clusterSource,
      zIndex: 5,
      properties: {
        layerName: layerId,
      },
      style: (feature) => setStyle(feature),
    });

    map.getView().fit(vectorSource.getExtent(), {
      padding: [100, 50, 50, 50],
      duration: 1000,
      easing: linear,
    });
    map.addLayer(puntos);
  }

  public removeAllLayers() {
    let l = this.getLayers().getArray();

    l.forEach((layer, index) => {
      if (index !== 0) {
        // Asumiendo que el mapa base es la primera capa
        this.removeLayer(layer);
      }
    });
  }

  public setOverlay({
    id,
    htmlElement,
    setData,
  }: {
    id: string;
    htmlElement: HTMLElement;
    setData: (d: overlayData) => void;
  }) {
    // Remove specific marker
    const over = new Overlay({
      id: id,
      offset: [0, -20],
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    over.setElement(htmlElement);
    this.addOverlay(over);

    this.on("click", (event) => {
      const { data, coords, features } = this.getLayerData({
        event: event,
        layerName: id,
      });

      if (data != null) {
        // hideOverlays(map, id);

        over.setPosition(coords);

        setData({ value: data, features });
      }
    });

    return {
      close: () => {
        over.setPosition(undefined);
      },
    };
  }

  public getLayerData({
    event,
    layerName,
  }: {
    event: MapBrowserEvent;
    layerName: string;
  }) {
    let ln;
    const features = this.getFeaturesAtPixel(event.pixel, {
      layerFilter: function (layer) {
        ln = layer.get("layerName");

        if (layerName === "all") return true;

        return ln === layerName;
      },
    });

    if (features.length === 0)
      return { data: null, layerName: null, coords: null, features: null };

    const data = features[0].getProperties();

    return {
      data: data.features?.[0].values_,
      layerName: ln,
      coords: data.geometry.flatCoordinates,
      features,
    };
  }

  public getCustomLayerByName(name: string): any {
    // Get layer by custom name
  }

  public toggleCustomLayer(layerId: string, visible: boolean): void {
    // Toggle layer visibility
  }
}

export default CustomMap;
