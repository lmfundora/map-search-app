import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import Zoom from "ol/control/Zoom.js";
import { defaults as defaultControls } from "ol/control/defaults.js";
import ScaleLine from "ol/control/ScaleLine.js";
import CustomMap from "./customMap";

export function useMap(mapDiv: HTMLDivElement | null) {
  const zoom = new Zoom();
  const control = new ScaleLine({});
  const initialMap = new CustomMap({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [-82.36506230011582, 23.113845366344023],
      zoom: 12.500317339709877,
      projection: "EPSG:4326",
    }),
    controls: defaultControls().extend([zoom, control]),
  });
  if (mapDiv) initialMap.setTarget(mapDiv);

  return initialMap;
}
