import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Cluster } from 'ol/source'
import { useInsStore } from '../../inspectionStore/inspectionStore'
import { linear } from 'ol/easing'
import { removeAllLayers } from './removeAllLayers'
import { hideOverlays } from './hideOverlays'

export function drawInsPoints({ data, layerName, setStyle }) {
  const { map } = useInsStore()

  removeAllLayers(map)

  hideOverlays(map)
  let gjson = {
    type: 'FeatureCollection',
    name: 'ptahorasi',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::3857' } },
    features: data.map((d) => ({
      type: 'Feature',
      properties: d.props,

      geometry: {
        type: 'Point',
        coordinates: d.coords
      }
    }))
  }

  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(gjson)
  })
  const clusterSource = new Cluster({
    distance: 20,
    minDistance: 0,
    source: vectorSource
  })
  const puntos = new VectorLayer({
    source: clusterSource,
    zIndex: 5,
    properties: {
      layerName: layerName
    },
    style: (feature) => setStyle(feature)
  })

  map.getView().fit(vectorSource.getExtent(), {
    padding: [170, 100, 290, 100],
    duration: 1000,
    easing: linear
  })
  map.addLayer(puntos)
}
