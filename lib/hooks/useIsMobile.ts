import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  });
  return isMobile;
}
