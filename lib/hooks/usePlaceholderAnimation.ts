import { useState, useEffect } from "react";

export function usePlaceholderAnimation(placeholders: string[]) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const letter =
        placeholders[currentPlaceholder].split("")[placeholder.length] || " ";

      if (placeholder.length >= placeholders[currentPlaceholder].length + 5) {
        if (currentPlaceholder >= placeholders.length - 1) {
          setCurrentPlaceholder(0);
        } else {
          setCurrentPlaceholder(currentPlaceholder + 1);
        }
        setPlaceholder("");
      } else {
        setPlaceholder(placeholder + letter);
      }
    }, 150);

    return () => clearTimeout(timeoutId); // Limpieza del timeout
  }, [placeholder, currentPlaceholder, placeholders]);

  return placeholder;
}
