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
      center: [-9165803, 2644595],
      zoom: 13,
      projection: "EPSG:4326",
    }),
    controls: defaultControls().extend([zoom, control]),
  });
  if (mapDiv) initialMap.setTarget(mapDiv);

  return initialMap;
}
