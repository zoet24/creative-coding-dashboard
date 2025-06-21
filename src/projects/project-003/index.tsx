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
        const scrollSpeed = (i + 1) * 0.3; // closer hills scroll faster
        const phaseOffset = time * scrollSpeed;

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

      // Draw tractor
      const tractorWidth = 100;
      const tractorHeight = 50;
      const wheelRadius = 15;

      // Move tractor from left to right
      const tractorSpeed = 0.5;
      const totalWidth = width + tractorWidth;
      const x = width / 2 - tractorWidth / 2;

      const y = groundY - 40;

      // Tractor body (green)
      ctx.fillStyle = "#228B22";
      ctx.fillRect(x, y, tractorWidth, tractorHeight);

      // Tractor cabin (yellow)
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(x + 60, y - 30, 30, 30);

      // Wheels (black)
      const drawWheel = (centerX: number, centerY: number) => {
        // Outer black wheel
        ctx.beginPath();
        ctx.arc(centerX, centerY, wheelRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();

        // Inner yellow hub
        ctx.beginPath();
        ctx.arc(centerX, centerY, wheelRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD700";
        ctx.fill();

        // Rotating spoke line
        const angle = (time / 10) % (2 * Math.PI); // adjust speed with divisor
        const spokeLength = wheelRadius * 0.4;
        const spokeX = centerX + Math.cos(angle) * spokeLength;
        const spokeY = centerY + Math.sin(angle) * spokeLength;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(spokeX, spokeY);
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      // Draw both wheels
      drawWheel(x + 20, y + tractorHeight);
      drawWheel(x + 80, y + tractorHeight);

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
