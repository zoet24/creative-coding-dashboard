import { groundBg } from "./colours";

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number
) => {
  ctx.fillStyle = groundBg; // grassy green
  ctx.fillRect(0, groundY, width, height * 0.4);
};
