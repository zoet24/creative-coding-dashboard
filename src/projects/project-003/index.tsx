import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useDeviceOrientation } from "../utils/useDeviceOrientation";
import { useSyncConfig } from "../utils/useSyncConfig";
import { drawGround } from "./utils/drawGround";
import { drawHills } from "./utils/drawHills";
import { drawSky } from "./utils/drawSky";
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
      const clampedGamma = Math.max(-80, Math.min(80, gamma));
      targetGamma.current = clampedGamma;
    });
    return stopListening;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const smokeParticles: SmokeParticle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let groundY = height * 0.6;
    let time = 0;
    let slope = 0;
    let rollOffsetX = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      groundY = height * 0.6;
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (!configRef.current?.isPlaying) return;

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

      const targetOffsetX = slope * 750;
      rollOffsetX += (targetOffsetX - rollOffsetX) * 0.1;

      ctx.clearRect(0, 0, width, height);

      drawSky(ctx, width, height);
      drawHills(ctx, width, height, groundY, time, noise2D.current);

      ctx.save();
      ctx.translate(width / 2, groundY);
      ctx.rotate(slope);

      drawGround(ctx, width, height);
      drawTractor(ctx, time, smokeParticles, rollOffsetX);

      ctx.restore();

      time += 1;
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [configRef.current?.isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Project003;
