import { groundBg } from "./colours";

export const drawGround = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number,
  slope: number
) => {
  const extraHeight = height;

  ctx.fillStyle = groundBg;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY + Math.tan(slope) * width);
  ctx.lineTo(width, height + extraHeight);
  ctx.lineTo(0, height + extraHeight);
  ctx.closePath();
  ctx.fill();
};
