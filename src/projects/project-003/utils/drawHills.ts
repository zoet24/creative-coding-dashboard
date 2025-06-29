import { NoiseFunction2D } from "simplex-noise";
import { hillsBg } from "./colours";

export const drawHills = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number,
  time: number,
  noise2D: NoiseFunction2D
) => {
  const waveCount = 3;

  for (let i = 0; i < waveCount; i++) {
    const amplitude = Math.max(10, height * (0.05 + i * 0.015));
    const hillOffset = Math.max(20, height * (i === 2 ? 0.25 : 0.3));
    const frequency = 0.005 + i * 0.002;
    const noiseScale = 0.0003;
    const speed = i * 0.001;
    const scrollSpeed = (i + 1) * 0.3;
    const phaseOffset = time * scrollSpeed;

    ctx.beginPath();
    ctx.moveTo(0, groundY + hillOffset);

    for (let x = 0; x <= width; x++) {
      const noise = noise2D((x + phaseOffset) * noiseScale, time * speed);
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
    ctx.fillStyle = hillsBg[i];
    ctx.fill();
  }
};
