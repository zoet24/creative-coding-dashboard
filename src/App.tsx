import { useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Menu from "./components/Menu/Menu";
import Toolbar from "./components/Toolbar/Toolbar";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      {/* Canvas - full screen */}
      <Canvas />

      {/* Toolbar (mobile top / desktop bottom) */}
      {isMobile && (
        <div className="absolute top-0 left-0 right-0 p-2 z-10">
          <Toolbar />
        </div>
      )}

      {/* Menu (bottom drawer on mobile, side panel on desktop) */}
      <div className="absolute bottom-0 left-0 right-0 md:static md:flex z-20">
        <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      </div>
    </div>
  );
}

export default App;
