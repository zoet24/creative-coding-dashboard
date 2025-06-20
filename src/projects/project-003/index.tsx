import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import { useActiveProject } from "../../context/ActiveProjectContext";

const Project003 = () => {
  // TOZO: Take this bit out and stick it in a hook to reuse!
  // ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const noise2D = useRef(createNoise2D());

  const { config, controlValues } = useActiveProject();
  const controlRef = useRef(controlValues);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    controlRef.current = controlValues;
  }, [controlValues]);
  // ---

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const groundY = height * 0.6;
    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      ctx.clearRect(0, 0, width, height);

      // Draw hills
      const hillColors = ["#6DC96D", "#4FA64D", "#3C8B3A"];
      const waveCount = 3;

      for (let i = 0; i < waveCount; i++) {
        let hillOffset;
        if (i === 2) {
          hillOffset = 250; // smaller front hill
        } else {
          hillOffset = 300;
        }

        const amplitude = 40 + i * 15;
        const frequency = 0.005 + i * 0.002;
        const noiseScale = 0.0003;
        const speed = i * 0.001;
        const phaseOffset = i * 1000;

        ctx.beginPath();
        ctx.moveTo(0, groundY + hillOffset);

        for (let x = 0; x <= width; x++) {
          const noise = noise2D.current(
            (x + phaseOffset) * noiseScale,
            time * speed
          );
          const y =
            groundY -
            hillOffset -
            Math.sin(x * frequency + time * 0.01 + i) * amplitude -
            noise * amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = hillColors[i];
        ctx.fill();
      }

      // Draw ground
      ctx.fillStyle = "#3BAA57"; // grassy green
      ctx.fillRect(0, groundY, width, height * 0.4);

      // TOZO - This too!
      // ---
      if (!configRef.current?.isPlaying) {
        return;
      }
      // ---

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
