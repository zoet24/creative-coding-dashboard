import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useControlValue } from "../../hooks/useControlValue";

const Day003 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const noise2D = useRef(createNoise2D());

  const { get } = useControlValue();

  const { config, controlValues } = useActiveProject();
  const controlRef = useRef(controlValues);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;

    console.log(configRef);
  }, [config]);

  // TOZO: Add more waves, make more complicated!

  useEffect(() => {
    controlRef.current = controlValues;
  }, [controlValues]);

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

      const amplitude = get("amplitude");
      const frequency = get("frequency");
      const noiseScale = get("noiseScale");

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(0, waveHeight);

      for (let x = 0; x <= width; x++) {
        const noiseValue = noise2D.current(x * noiseScale, time * 0.005);
        const y =
          waveHeight +
          Math.sin(x * frequency + time * 0.01) * amplitude +
          noiseValue * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = "#87CEEB";
      ctx.fill();

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

export default Day003;
