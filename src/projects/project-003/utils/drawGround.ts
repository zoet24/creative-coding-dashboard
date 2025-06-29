import { groundBg } from "./colours";

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.fillStyle = groundBg;
  ctx.beginPath();
  ctx.moveTo(-width, 0);
  ctx.lineTo(width + width, 0);
  ctx.lineTo(width + width, height);
  ctx.lineTo(-width, height);
  ctx.closePath();
  ctx.fill();
};
