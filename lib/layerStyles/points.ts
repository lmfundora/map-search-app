import { Icon, Style } from "ol/style";

export function selectStyle(feature: any) {
  let icon = "/icons8-marcador-100.png";

  if (feature.values_.features.length > 1) {
    icon = "/icons8-lugares-romanticos-64.png";
  }

  const style = genericPointStyle(icon);

  return style;
}

export function genericPointStyle(iconSRC: string) {
  return new Style({
    image: new Icon({
      src: iconSRC,
      displacement: [0, 6],
      width: 30,
      height: 30,
    }),
  });
}
