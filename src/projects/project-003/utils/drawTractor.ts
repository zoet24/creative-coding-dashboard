import {
  tractorBodyBlack,
  tractorBodyGreen,
  tractorBodyYellow,
} from "./colours";
import { SmokeParticle, emitSmoke, updateAndDrawSmoke } from "./drawSmoke";

export const drawTractor = (
  ctx: CanvasRenderingContext2D,
  width: number,
  groundY: number,
  time: number,
  smokeParticles: SmokeParticle[]
) => {
  const tractorWidth = 100;
  const tractorHeight = 50;
  const wheelRadius = 18;

  const x = width / 2 - tractorWidth / 2;

  const bounceY = Math.sin(time * 0.1);
  const y = groundY - 40 + bounceY;

  // Tractor body
  ctx.fillStyle = tractorBodyGreen;
  ctx.fillRect(x, y, tractorWidth, tractorHeight);

  // Cabin
  ctx.fillStyle = tractorBodyGreen;
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 45);
  ctx.lineTo(x + 40, y - 45);
  ctx.lineTo(x + 35, y + 2);
  ctx.lineTo(x, y + 2);
  ctx.closePath();
  ctx.fill();

  // Window
  ctx.fillStyle = tractorBodyYellow;
  ctx.beginPath();
  ctx.moveTo(x, y - 40);
  ctx.lineTo(x + 35, y - 40);
  ctx.lineTo(x + 30, y - 5);
  ctx.lineTo(x + 5, y - 5);
  ctx.closePath();
  ctx.fill();

  // Exhaust
  const exhaustX = x - 10;
  const exhaustY = y + tractorHeight;
  ctx.fillStyle = tractorBodyBlack;
  ctx.fillRect(exhaustX, exhaustY - 10, 10, 5);

  // Wheels
  const drawWheel = (
    centerX: number,
    centerY: number,
    rotationAngle: number
  ) => {
    // Wheel body
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius, 0, Math.PI * 2);
    ctx.fillStyle = tractorBodyBlack;
    ctx.fill();

    for (let i = 0; i < 6; i++) {
      const treadAngle = rotationAngle + i * (Math.PI / 3);

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        wheelRadius,
        treadAngle,
        treadAngle + Math.PI / 6
      );
      ctx.strokeStyle = tractorBodyBlack;
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Wheel hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = tractorBodyYellow;
    ctx.fill();
  };

  const angle = (time / 30) % (2 * Math.PI);
  drawWheel(x + 20, y + tractorHeight - 5, angle);
  drawWheel(x + 80, y + tractorHeight - 5, angle);

  // Smoke
  emitSmoke(smokeParticles, exhaustX + 2, exhaustY - 10, time);
  updateAndDrawSmoke(ctx, smokeParticles);
};
