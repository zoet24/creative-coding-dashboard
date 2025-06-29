import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useDeviceOrientation } from "../utils/useDeviceOrientation";
import { useSyncConfig } from "../utils/useSyncConfig";
import { drawGround } from "./utils/drawGround";
import { drawHills } from "./utils/drawHills";
import { SmokeParticle } from "./utils/drawSmoke";
import { drawTractor } from "./utils/drawTractor";

const Project003 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, controlValues } = useActiveProject();
  const configRef = useSyncConfig(config);
  const controlRef = useSyncConfig(controlValues);
  const noise2D = useRef(createNoise2D());
  const targetGamma = useRef(0);
  const currentGamma = useRef(0);

  useEffect(() => {
    const stopListening = useDeviceOrientation(({ gamma }) => {
      const clampedGamma = Math.max(-45, Math.min(45, gamma));
      targetGamma.current = clampedGamma;
    });
    return stopListening;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const smokeParticles: SmokeParticle[] = [];

    const groundY = height * 0.6;
    let time = 0;
    let slope = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      const values = controlRef.current;
      const useSlope = values["toggleSlope"] as boolean;

      if (useSlope) {
        currentGamma.current +=
          (targetGamma.current - currentGamma.current) * 0.1;
        slope = ((currentGamma.current * Math.PI) / 180) * 0.3;
      } else {
        slope = 0;
      }

      ctx.clearRect(0, 0, width, height);

      drawHills(ctx, width, height, groundY, time, noise2D.current);
      drawGround(ctx, width, height, groundY, slope);
      drawTractor(ctx, width, groundY, time, smokeParticles);

      if (!configRef.current?.isPlaying) return;
      time += 1;
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Project003;
