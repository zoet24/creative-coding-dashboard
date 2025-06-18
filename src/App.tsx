import { useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Menu from "./components/Menu/Menu";
import { useFullscreen } from "./context/FullscreenContext";

function App() {
  const { isFullscreen } = useFullscreen();
  const [menuOpen, setMenuOpen] = useState(false);

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
