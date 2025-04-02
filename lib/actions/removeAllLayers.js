export function removeAllLayers(map) {
  let l = map.getLayers().getArray()

  l.forEach((layer, index) => {
    if (index !== 0) {
      // Asumiendo que el mapa base es la primera capa
      map.removeLayer(layer)
    }
  })
}
