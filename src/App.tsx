import { useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Menu from "./components/Menu/Menu";
import { useFullscreen } from "./context/FullscreenContext";

function App() {
  const env = import.meta.env.VITE_ENV;

  const { isFullscreen } = useFullscreen();
  const [menuOpen, setMenuOpen] = useState(env === "dev" ? false : true);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      <Canvas />

      {!isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </div>
      )}
    </div>
  );
}

export default App;
