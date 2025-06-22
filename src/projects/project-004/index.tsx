import { useEffect, useRef } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { activateMatchingKeys } from "../utils/keyboard";
import { shuffleArray } from "../utils/shuffleArray";
import { useSyncConfig } from "../utils/useSyncConfig";
import { getNeighbourIndices } from "./utils/getNeighbourIndices";

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
  scaleEffect?: number;
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
      const key = e.key.toUpperCase();
      const values = controlRef.current;
      const cols = values["cols"] as number;
      const rows = values["rows"] as number;
      const scaleFactor = values["scaleFactor"] as number;

      activateMatchingKeys(key, squaresRef.current, (sq, index) => {
        sq.activatedAt = Date.now();
        sq.scaleEffect = (sq.scaleEffect ?? 0) + scaleFactor;

        const neighbors = getNeighbourIndices(index, cols, rows);
        neighbors.forEach((ni) => {
          const neighbor = squaresRef.current[ni];
          neighbor.scaleEffect = (neighbor.scaleEffect ?? 0) + scaleFactor / 2;
        });
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
        const scale = 1 + (square.scaleEffect ?? 0);
        const sizeScaled = size * scale;

        const x = offsetX + (index % cols) * size + (size - sizeScaled) / 2;
        const y =
          offsetY + Math.floor(index / cols) * size + (size - sizeScaled) / 2;

        const timeSince = square.activatedAt
          ? Date.now() - square.activatedAt
          : null;

        const isActive = timeSince !== null && timeSince < 2000;
        const fade = isActive ? 1 - timeSince / 2000 : 0;
        const color = `rgba(255, 223, 0, ${fade})`;

        // ctx.fillStyle = "transparent"; // Cool border effect
        ctx.fillStyle = isActive ? color : "#fff";
        ctx.fillRect(x, y, sizeScaled, sizeScaled);

        ctx.strokeStyle = "#ccc";
        ctx.strokeRect(x, y, sizeScaled, sizeScaled);

        ctx.fillStyle = "#000";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          displayLabel(square.key),
          x + sizeScaled / 2,
          y + sizeScaled / 2
        );

        if (square.scaleEffect) {
          square.scaleEffect *= 0.995;
          if (Math.abs(square.scaleEffect) < 0.001) {
            square.scaleEffect = 0;
          }
        }
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
