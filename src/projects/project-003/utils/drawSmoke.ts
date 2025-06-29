import { smokeBg } from "./colours";

export type SmokeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  life: number;
};

export const emitSmoke = (
  smokeParticles: SmokeParticle[],
  x: number,
  y: number,
  time: number
) => {
  if (time % 20 === 0) {
    const numParticles = Math.floor(Math.random() * 2) + 3; // 1-2 for continuous
    for (let i = 0; i < numParticles; i++) {
      const angle = -Math.PI + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 0.5 + 0.5;
      smokeParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 2 + 3,
        life: 0,
      });
    }
  }
};

export const updateAndDrawSmoke = (
  ctx: CanvasRenderingContext2D,
  smokeParticles: SmokeParticle[]
) => {
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    const p = smokeParticles[i];
    p.life += 1;
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.01;

    const wobbleX = Math.sin(p.life * 0.2) * 0.5;
    const renderX = p.x + wobbleX;

    ctx.beginPath();
    ctx.arc(renderX, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${smokeBg},${p.alpha})`;
    ctx.fill();

    if (p.alpha <= 0) {
      smokeParticles.splice(i, 1);
    }
  }
};
