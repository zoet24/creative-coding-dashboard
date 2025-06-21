import { useEffect, useRef } from "react";

const ALL_KEYS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "-",
  "=",
  "[",
  "]",
  ";",
  "'",
  ",",
  ".",
  "/",
  "\\",
  "`",
  " ",
];
const COLUMNS = 7;
const SQUARE_SIZE = 50;
const PADDING = 8;
const LIGHT_DURATION = 2000;

type Square = {
  x: number;
  y: number;
  key: string;
  activatedAt: number | null;
};

const Project004 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const squaresRef = useRef<Square[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const rows = Math.ceil(ALL_KEYS.length / COLUMNS);
    const totalWidth = COLUMNS * SQUARE_SIZE + (COLUMNS - 1) * PADDING;
    const totalHeight = rows * SQUARE_SIZE + (rows - 1) * PADDING;
    const startX = (width - totalWidth) / 2;
    const startY = (height - totalHeight) / 2;

    const squares: Square[] = ALL_KEYS.map((key, index) => {
      const col = index % COLUMNS;
      const row = Math.floor(index / COLUMNS);
      return {
        x: startX + col * (SQUARE_SIZE + PADDING),
        y: startY + row * (SQUARE_SIZE + PADDING),
        key,
        activatedAt: null,
      };
    });

    squaresRef.current = squares;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      for (const square of squaresRef.current) {
        const timeSinceActivation = square.activatedAt
          ? now - square.activatedAt
          : null;
        const isActive =
          timeSinceActivation !== null && timeSinceActivation < LIGHT_DURATION;

        let color = "white";

        if (isActive) {
          const progress = timeSinceActivation! / LIGHT_DURATION;
          const intensity = Math.max(1 - progress, 0);
          color = `rgba(0, 150, 255, ${intensity})`;
        }

        ctx.fillStyle = color;
        ctx.fillRect(square.x, square.y, SQUARE_SIZE, SQUARE_SIZE);

        ctx.strokeStyle = "#333";
        ctx.strokeRect(square.x, square.y, SQUARE_SIZE, SQUARE_SIZE);

        // Draw key label
        ctx.fillStyle = "#000";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          square.key,
          square.x + SQUARE_SIZE / 2,
          square.y + SQUARE_SIZE / 2
        );
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const actualKey = key === " " ? " " : key;
      const square = squaresRef.current.find((sq) => sq.key === actualKey);
      if (square) {
        square.activatedAt = Date.now();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Project004;
