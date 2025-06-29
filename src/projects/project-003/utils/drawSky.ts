import { colourSchemes } from "./colours";
import { getTimeOfDay } from "./getTimeOfDay";

export const drawSky = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const timeOfDay = getTimeOfDay();
  const timeOfDayColour = colourSchemes[timeOfDay];

  ctx.fillStyle = timeOfDayColour.skyBg;
  ctx.fillRect(0, 0, width, height);
};
