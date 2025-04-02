export function hideOverlays(map, id) {
  const overlays = map.getOverlays()
  if (id) {
    overlays.forEach((overlay) => {
      if (overlay.getId() !== id) overlay.setPosition(undefined)
    })
  } else {
    overlays.forEach((overlay) => {
      overlay.setPosition(undefined)
    })
  }
}
