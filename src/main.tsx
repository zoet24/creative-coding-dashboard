import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ActiveProjectProvider } from "./context/ActiveProjectContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ActiveProjectProvider>
      <App />
    </ActiveProjectProvider>
  </StrictMode>
);
