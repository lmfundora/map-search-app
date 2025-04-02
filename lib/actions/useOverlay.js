import Overlay from 'ol/Overlay'
import { getLayerData } from './getLayerData'
import { hideOverlays } from './hideOverlays'

import { ref } from 'vue'

export function useOverlay({ map, id, htmlElement }) {
  const pdata = ref(null)
  const over = new Overlay({
    id: id,
    offset: [0, -20],
    autoPan: {
      animation: {
        duration: 250
      }
    }
  })

  over.setElement(htmlElement)
  map.addOverlay(over)

  map.on('click', (event) => {
    const { data, coords, features } = getLayerData({ map, event: event, layerName: id })

    if (data != null && data.length == 1) {
      hideOverlays(map, id)

      over.setPosition(coords)

      pdata.value = { data, features }
    }
  })

  return {
    value: pdata,
    close: () => {
      over.setPosition(undefined)
    }
  }
}
