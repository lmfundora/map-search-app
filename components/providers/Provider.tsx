import { ReactNode } from "react";
import { MapContextProvider } from "./contexts/MapContext";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    // Aquí puedes anidar todos tus providers
    <MapContextProvider>
      {/* Cuando tengas más contextos, los añades aquí */}
      {/* <OtroContextProvider> */}
      {/*   <OtroContextMasProvider> */}
      {children}
      {/*   </OtroContextMasProvider> */}
      {/* </OtroContextProvider> */}
    </MapContextProvider>
  );
};
