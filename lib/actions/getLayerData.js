export function getLayerData({ map, event, layerName }) {
  let ln
  const features = map.getFeaturesAtPixel(event.pixel, {
    layerFilter: function (layer) {
      ln = layer.get('layerName')

      if (layerName === 'all') return true

      return ln === layerName
    }
  })

  if (features.length === 0) return { data: null, layerName: null, coords: null }

  const data = features[0].values_.features.map((i) => i.values_)

  return {
    data,
    layerName: ln,
    coords: features[0].values_.features[0].values_.geometry.flatCoordinates,
    features
  }
}
