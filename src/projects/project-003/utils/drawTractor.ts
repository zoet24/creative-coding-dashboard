import { tractorBodyGreen, tractorBodyYellow } from "./colours";

export type SmokeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  life: number; // frame count since creation
};

export const drawTractor = (
  ctx: CanvasRenderingContext2D,
  width: number,
  groundY: number,
  time: number,
  smokeParticles: SmokeParticle[]
) => {
  const tractorWidth = 100;
  const tractorHeight = 50;
  const wheelRadius = 15;

  const x = width / 2 - tractorWidth / 2;
  const y = groundY - 40;

  // Tractor body
  ctx.fillStyle = "#228B22";
  ctx.fillRect(x, y, tractorWidth, tractorHeight);

  // Tractor cabin - offset toward back, slightly taller
  ctx.fillStyle = tractorBodyGreen;
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 45); // rear top
  ctx.lineTo(x + 40, y - 45); // front top
  ctx.lineTo(x + 35, y + 2); // front bottom
  ctx.lineTo(x, y + 2); // rear bottom
  ctx.closePath();
  ctx.fill();

  // Cabin window - slightly sloped
  ctx.fillStyle = tractorBodyYellow;
  ctx.beginPath();
  ctx.moveTo(x, y - 40);
  ctx.lineTo(x + 35, y - 40);
  ctx.lineTo(x + 30, y - 5);
  ctx.lineTo(x + 5, y - 5);
  ctx.closePath();
  ctx.fill();

  // Exhaust pipe
  const exhaustX = x - 10;
  const exhaustY = y + tractorHeight;
  ctx.fillStyle = "#333";
  ctx.fillRect(exhaustX, exhaustY - 10, 10, 5);

  // Draw wheels
  const drawWheel = (centerX: number, centerY: number) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();

    const angle = (time / 10) % (2 * Math.PI);
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

  drawWheel(x + 20, y + tractorHeight);
  drawWheel(x + 80, y + tractorHeight);

  // Update & draw smoke particles
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    const p = smokeParticles[i];
    p.life += 1;
    p.x += p.vx;
    p.y += p.vy;

    // Add a slight horizontal oscillation
    const wobbleX = Math.sin(p.life * 0.2) * 0.5;
    const renderX = p.x + wobbleX;

    p.alpha -= 0.01;

    ctx.beginPath();
    ctx.arc(renderX, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(50,50,50,${p.alpha})`;
    ctx.fill();

    if (p.alpha <= 0) {
      smokeParticles.splice(i, 1);
    }
  }

  // Occasionally emit a burst of smoke
  if (time % 25 === 0) {
    const numParticles = Math.floor(Math.random() * 3) + 3; // 3-5
    for (let i = 0; i < numParticles; i++) {
      const angle = -Math.PI + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 0.5 + 0.5;
      smokeParticles.push({
        x: exhaustX + 2,
        y: exhaustY - 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 2 + 3, // radius 3-5
        life: 0,
      });
    }
  }
};
