import { useRef } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useSyncConfig } from "../utils/useSyncConfig";

const Project = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, controlValues } = useActiveProject();
  const configRef = useSyncConfig(config);
  const controlRef = useSyncConfig(controlValues);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Project;
