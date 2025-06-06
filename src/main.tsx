import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ActiveProjectProvider } from "./context/ActiveProjectContext";
import { FullscreenProvider } from "./context/FullscreenContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FullscreenProvider>
      <ActiveProjectProvider>
        <App />
      </ActiveProjectProvider>
    </FullscreenProvider>
  </StrictMode>
);
