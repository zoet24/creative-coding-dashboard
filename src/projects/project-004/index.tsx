import { useEffect, useRef } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { activateMatchingKeys } from "../utils/keyboard";
import { shuffleArray } from "../utils/shuffleArray";
import { useSyncConfig } from "../utils/useSyncConfig";

const KEY_LIST = [
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
  "Enter",
  "Backspace",
  "Shift",
  "Tab",
  "Escape",
];

const displayLabel = (key: string) => {
  return "";
  if (key === " ") return "␣";
  if (key === "Enter") return "⏎";
  if (key === "Backspace") return "⌫";
  if (key === "Shift") return "⇧";
  if (key === "Tab") return "⇥";
  if (key === "Escape") return "⎋";
  return key;
};

type Square = {
  key: string;
  activatedAt: number | null;
};

const Project004 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, controlValues } = useActiveProject();
  const configRef = useSyncConfig(config);
  const controlRef = useSyncConfig(controlValues);
  const squaresRef = useRef<Square[]>([]);

  // Keep the latest config/control in refs
  useEffect(() => {
    controlRef.current = controlValues;
    configRef.current = config;
  }, [config, controlValues]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const initCanvas = () => {
      const values = controlRef.current;
      const cols = values["cols"] as number;
      const rows = values["rows"] as number;
      const totalSquares = cols * rows;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const squares: Square[] = [];
      let shuffledKeys = shuffleArray(KEY_LIST);
      let keyIndex = 0;

      for (let i = 0; i < totalSquares; i++) {
        if (keyIndex >= shuffledKeys.length) {
          shuffledKeys = shuffleArray(KEY_LIST);
          keyIndex = 0;
        }

        squares.push({
          key: shuffledKeys[keyIndex],
          activatedAt: null,
        });

        keyIndex++;
      }

      squaresRef.current = squares;
    };

    const handleResize = () => {
      initCanvas(); // reinitialise on resize
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      activateMatchingKeys(e.key, squaresRef.current, (sq) => {
        sq.activatedAt = Date.now();
      });
    };

    const draw = () => {
      const values = controlRef.current;
      const size = values["size"] as number;
      const cols = values["cols"] as number;
      const rows = values["rows"] as number;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = (canvas.width - cols * size) / 2;
      const offsetY = (canvas.height - rows * size) / 2;

      squaresRef.current.forEach((square, index) => {
        const x = offsetX + (index % cols) * size;
        const y = offsetY + Math.floor(index / cols) * size;

        const timeSince = square.activatedAt
          ? Date.now() - square.activatedAt
          : null;

        const isActive = timeSince !== null && timeSince < 2000;
        const fade = isActive ? 1 - timeSince / 2000 : 0;
        const color = `rgba(255, 223, 0, ${fade})`;

        ctx.fillStyle = isActive ? color : "#fff";
        ctx.fillRect(x, y, size, size);

        ctx.strokeStyle = "#ccc";
        ctx.strokeRect(x, y, size, size);

        ctx.fillStyle = "#000";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(displayLabel(square.key), x + size / 2, y + size / 2);
      });

      requestAnimationFrame(draw);
    };

    // Initialise on first load
    initCanvas();
    draw();

    // Listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Reinitialise if config/controlValues change
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const values = controlRef.current;
      const cols = values["cols"] as number;
      const rows = values["rows"] as number;
      const totalSquares = cols * rows;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const squares: Square[] = [];
      let shuffledKeys = shuffleArray(KEY_LIST);
      let keyIndex = 0;

      for (let i = 0; i < totalSquares; i++) {
        if (keyIndex >= shuffledKeys.length) {
          shuffledKeys = shuffleArray(KEY_LIST);
          keyIndex = 0;
        }

        squares.push({
          key: shuffledKeys[keyIndex],
          activatedAt: null,
        });

        keyIndex++;
      }

      squaresRef.current = squares;
    }
  }, [config, controlValues]);

  return (
    <canvas ref={canvasRef} className="w-full h-full fixed top-0 left-0" />
  );
};

export default Project004;
