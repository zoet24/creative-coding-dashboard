import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useSyncConfig } from "../utils/useSyncConfig";

const Project002 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, controlValues } = useActiveProject();
  const configRef = useSyncConfig(config);
  const controlRef = useSyncConfig(controlValues);
  const noise2D = useRef(createNoise2D());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const waveHeight = height / 2;
    let time = 0;

    const animate = () => {
      if (!ctx) return;

      requestAnimationFrame(animate);

      const values = controlRef.current;
      const amplitude = values["amplitude"] as number;
      const frequency = values["frequency"] as number;
      const waveSpeed = values["waveSpeed"] as number;
      const noiseScale = values["noiseScale"] as number;
      const waveCount = values["waveCount"] as number;
      const colour =
        typeof values["colour"] === "string" ? values["colour"] : "#000000";

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < waveCount; i++) {
        const phaseOffset = i * Math.PI * 0.5;
        const localAmplitude = amplitude * (1 - i * 0.2);
        const localColour = colour;
        const verticalOffset = i - (waveCount - 1) / 2;
        const noiseOffset = i * 1000;

        ctx.beginPath();
        ctx.moveTo(0, waveHeight);

        for (let x = 0; x <= width; x++) {
          const noiseValue = noise2D.current(
            (x + noiseOffset) * noiseScale,
            (time + i * 20) * waveSpeed * 0.5
          );

          const y =
            waveHeight +
            verticalOffset +
            Math.sin(x * frequency + time * waveSpeed + phaseOffset) *
              localAmplitude +
            noiseValue * localAmplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = localColour;
        ctx.globalAlpha = 1 / (i + 1);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!configRef.current?.isPlaying) {
        return;
      }

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

export default Project002;
