// context/FullscreenContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type FullscreenContextType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

const FullscreenContext = createContext<FullscreenContextType | undefined>(
  undefined
);

export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error("useFullscreen must be used within a FullscreenProvider");
  }
  return context;
};

export const FullscreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(console.error);
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(console.error);
    }
  };

  // Listen for fullscreen changes (user pressing Esc, etc.)
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};
