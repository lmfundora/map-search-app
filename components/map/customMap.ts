import { MapOptions } from "ol/Map";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import GeoJSON from "ol/format/GeoJSON.js";
import { Cluster } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { linear } from "ol/easing";

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

    // this.removeAllLayers();

    // this.hideOverlays();
    let gjson = {
      type: "FeatureCollection",
      name: "ptahorasi",
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::3857" } },
      features: data.map((d) => ({
        type: "Feature",
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
      padding: [170, 100, 290, 100],
      duration: 1000,
      easing: linear,
    });
    map.addLayer(puntos);
  }
  public addCustomLayer(layerName: string): void {
    // Add custom layer functionality
  }

  public removeCustomMarker(markerId: string): void {
    // Remove specific marker
  }

  public setCustomView(zoom: number, center: number[]): void {
    // Set custom view settings
  }

  public getCustomLayerByName(name: string): any {
    // Get layer by custom name
  }

  public toggleCustomLayer(layerId: string, visible: boolean): void {
    // Toggle layer visibility
  }
}

export default CustomMap;
