import { useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Menu from "./components/Menu/Menu";
import Toolbar from "./components/Toolbar/Toolbar";
import { useFullscreen } from "./context/FullscreenContext";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const { isFullscreen } = useFullscreen();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      <Canvas />

      {isMobile && !isFullscreen && (
        <div className="absolute top-0 left-0 right-0 p-2 z-10">
          <Toolbar />
        </div>
      )}

      {!isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </div>
      )}
    </div>
  );
}

export default App;
