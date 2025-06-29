import { colourSchemes } from "./colours";
import { SmokeParticle, emitSmoke, updateAndDrawSmoke } from "./drawSmoke";
import { getTimeOfDay } from "./getTimeOfDay";

export const drawTractor = (
  ctx: CanvasRenderingContext2D,
  time: number,
  smokeParticles: SmokeParticle[],
  offsetX: number
) => {
  const tractorWidth = 100;
  const tractorHeight = 50;
  const wheelRadius = 18;

  const x = -tractorWidth / 2 + offsetX;
  const bounceY = Math.sin(time * 0.1);
  const y = -40 + bounceY;

  const timeOfDay = getTimeOfDay();
  const timeOfDayColour = colourSchemes[timeOfDay];

  // Tractor body
  ctx.fillStyle = timeOfDayColour.tractorBodyGreen;
  ctx.fillRect(x, y, tractorWidth, tractorHeight);

  // Cabin
  ctx.fillStyle = timeOfDayColour.tractorBodyGreen;
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 45);
  ctx.lineTo(x + 40, y - 45);
  ctx.lineTo(x + 35, y + 2);
  ctx.lineTo(x, y + 2);
  ctx.closePath();
  ctx.fill();

  // Window
  ctx.fillStyle = timeOfDayColour.tractorBodyYellow;
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
  ctx.fillStyle = timeOfDayColour.tractorBodyBlack;
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
    ctx.fillStyle = timeOfDayColour.tractorBodyBlack;
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
      ctx.strokeStyle = timeOfDayColour.tractorBodyBlack;
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Wheel hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = timeOfDayColour.tractorBodyYellow;
    ctx.fill();
  };

  const maxOffset = 500;

  let denominator;
  if (offsetX <= 0) {
    const t = (offsetX + maxOffset) / maxOffset;
    denominator = 40 + t * (20 - 40);
  } else {
    const t = offsetX / maxOffset;
    denominator = 20 + t * (10 - 20);
  }

  const angle = (time / denominator) % (2 * Math.PI);

  drawWheel(x + 20, y + tractorHeight - 5, angle);
  drawWheel(x + 80, y + tractorHeight - 5, angle);

  // Smoke
  emitSmoke(smokeParticles, exhaustX + 2, exhaustY - 10, time, offsetX);
  updateAndDrawSmoke(ctx, smokeParticles);
};
