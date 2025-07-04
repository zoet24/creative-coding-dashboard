import { colourSchemes } from "./colours";
import { getTimeOfDay } from "./getTimeOfDay";

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const timeOfDay = getTimeOfDay();
  const timeOfDayColour = colourSchemes[timeOfDay];

  ctx.fillStyle = timeOfDayColour.groundBg;
  ctx.beginPath();
  ctx.moveTo(-width, 0);
  ctx.lineTo(width + width, 0);
  ctx.lineTo(width + width, height);
  ctx.lineTo(-width, height);
  ctx.closePath();
  ctx.fill();
};
