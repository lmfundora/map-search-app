import { MapOptions } from "ol/Map";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import GeoJSON from "ol/format/GeoJSON.js";
import { Cluster } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { linear } from "ol/easing";
import { MapBrowserEvent, Overlay } from "ol";
import Feature, { FeatureLike } from "ol/Feature";
import { genericPointStyle, selectStyle } from "@/lib/layerStyles/points";

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
    this.clickHanlder();
  }

  clickHanlder() {
    this.on("click", (event) => {
      const f = this.getFeaturesAtPixel(event.pixel);
      // Cuando no hay datos donde se hizo click
      if (f.length === 0) {
        this.hideOverlays();
        return;
      }

      const { features } = f[0].getProperties();
      const featureData = features[0].values_;
      const coords = featureData.geometry.flatCoordinates;

      // Cando sean vairos puntos
      if (features.length > 1) {
        const overlay = this.getOverlayById("multiple");
        if (overlay) {
          this.hideOverlays("multiple");
          overlay.setPosition(coords);
        }
        return;
      }

      // Cuando solo hay un punto
      const overlay = this.getOverlayById(featureData.layerId);
      if (overlay) {
        this.hideOverlays(featureData.layerId);
        const setData = overlay?.get("action");
        setData(featureData);
        overlay.setPosition(coords);
      }
    });
  }

  public drawPoints({ data, layerId, setStyle }: drawPointsProps) {
    const map = this;

    this.removeAllLayers();
    this.hideOverlays();
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
    setData?: (d: overlayData) => void;
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

    if (setData) {
      over.set("action", setData, true);
    }
    over.setElement(htmlElement);
    this.addOverlay(over);

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

  public hideOverlays(id?: string) {
    const overlays = this.getOverlays();
    if (id) {
      overlays.forEach((overlay) => {
        if (overlay.getId() !== id) overlay.setPosition(undefined);
      });
    } else {
      overlays.forEach((overlay) => {
        overlay.setPosition(undefined);
      });
    }
  }

  public highlightPoint(id: String): void {
    let icon = "/Location-Pin-2--Streamline-Core-Gradient.png";
    const layers = this.getAllLayers();

    if (layers.length <= 1) return;
    const layer = layers[1] as VectorLayer;
    layer.setStyle((feature) => {
      if (feature.getProperties().features[0].id_ === id) {
        return genericPointStyle(icon);
      } else {
        return selectStyle(feature);
      }
    });
  }
}

export default CustomMap;
