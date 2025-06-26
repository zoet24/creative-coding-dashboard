import { useEffect, useRef } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { activateMatchingKeys } from "../utils/keyboard";
import { shuffleArray } from "../utils/shuffleArray";
import { useSyncConfig } from "../utils/useSyncConfig";
import { ColourPalette, colourPalettes } from "./utils/colourPalettes";
import { getNeighbourIndices } from "./utils/getNeighbourIndices";
import { simulateTyping } from "./utils/simulateTyping";

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

// Update display label - when letters are active you can see them?

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
  targetScale?: number;
  status?: "active" | "neighbour" | "inactive";
};

const Project004 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, controlValues, textAreaFocused } = useActiveProject();
  const configRef = useSyncConfig(config);
  const controlRef = useSyncConfig(controlValues);
  const squaresRef = useRef<Square[]>([]);
  const dimsRef = useRef({ rows: 0, cols: 0 });

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
      const size = values["size"] as number;
      // const cols = values["cols"] as number;
      // const rows = values["rows"] as number;
      const cols = Math.floor(canvas.width / size) + 1;
      const rows = Math.floor(canvas.height / size) + 1;
      dimsRef.current = { cols, rows };
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
      // const cols = values["cols"] as number;
      // const rows = values["rows"] as number;
      const { cols, rows } = dimsRef.current;
      const scaleFactor = values["scaleFactor"] as number;

      activateMatchingKeys(key, squaresRef.current, (sq, index) => {
        sq.targetScale = (sq.targetScale ?? 0) + scaleFactor;
        sq.status = "active";
        sq.activatedAt = Date.now();

        const neighbors = getNeighbourIndices(index, cols, rows);
        neighbors.forEach((ni) => {
          const neighbor = squaresRef.current[ni];
          neighbor.targetScale = (neighbor.targetScale ?? 0) + scaleFactor / 2;
          neighbor.status = "neighbour";
          neighbor.activatedAt = Date.now();
        });
      });
    };

    const blendColors = (from: string, to: string, t: number) => {
      const [r1, g1, b1] = from.split(",").map(Number);
      const [r2, g2, b2] = to.split(",").map(Number);

      const r = Math.round(r1 * t + r2 * (1 - t));
      const g = Math.round(g1 * t + g2 * (1 - t));
      const b = Math.round(b1 * t + b2 * (1 - t));

      return `rgb(${r}, ${g}, ${b})`;
    };

    const draw = () => {
      const values = controlRef.current;
      const size = values["size"] as number;
      const { cols, rows } = dimsRef.current;

      const colourPalette = values["colourPalette"] as ColourPalette;
      const {
        colourBg,
        colourCellActive,
        colourCellBorder,
        colourCellInactive,
        colourCellNeighbour,
      } = colourPalettes[colourPalette];

      // const cols = values["cols"] as number;
      // const rows = values["rows"] as number;

      ctx.fillStyle = `rgb(${colourBg})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const offsetX = (canvas.width - cols * size) / 2;
      const offsetY = (canvas.height - rows * size) / 2;

      // Sort squares by status: inactive first, then neighbour, then active
      const sortedSquares = [...squaresRef.current].sort((a, b) => {
        const statusOrder = { inactive: 0, neighbour: 1, active: 2 };
        return (
          (statusOrder[a.status ?? "inactive"] ?? 0) -
          (statusOrder[b.status ?? "inactive"] ?? 0)
        );
      });

      sortedSquares.forEach((square, index) => {
        const scale = 1 + (square.scaleEffect ?? 0);
        const sizeScaled = size * scale;

        if (square.targetScale !== undefined) {
          square.scaleEffect = square.scaleEffect ?? 0;
          square.scaleEffect += (square.targetScale - square.scaleEffect) * 0.1;

          // If very close to target, snap to target
          if (Math.abs(square.scaleEffect - square.targetScale) < 0.001) {
            square.scaleEffect = square.targetScale;
          }
        }

        const origIndex = squaresRef.current.indexOf(square); // position in original grid
        const x = offsetX + (origIndex % cols) * size + (size - sizeScaled) / 2;
        const y =
          offsetY +
          Math.floor(origIndex / cols) * size +
          (size - sizeScaled) / 2;

        const timeSince = square.activatedAt
          ? Date.now() - square.activatedAt
          : null;
        const isActive = timeSince !== null && timeSince < 2000;
        const fade = isActive ? 1 - timeSince / 2000 : 0;

        if (square.status === "active") {
          ctx.fillStyle = blendColors(
            colourCellActive,
            colourCellInactive,
            fade
          );
        } else if (square.status === "neighbour") {
          ctx.fillStyle = blendColors(
            colourCellNeighbour,
            colourCellInactive,
            fade
          );
        } else {
          ctx.fillStyle = `rgb(${colourCellInactive})`;
        }

        ctx.fillRect(x, y, sizeScaled, sizeScaled);

        ctx.strokeStyle = `rgb(${colourCellBorder})`;
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

        // Decay the effect and reset to inactive
        if (square.scaleEffect !== undefined) {
          square.scaleEffect *= 0.99;
        }
        if (square.targetScale !== undefined) {
          square.targetScale *= 0.99;

          if (
            Math.abs(square.scaleEffect ?? 0) < 0.001 &&
            Math.abs(square.targetScale) < 0.001
          ) {
            square.scaleEffect = 0;
            square.targetScale = 0;
            square.status = "inactive";
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

  const typingTimeoutRef = useRef<number[]>([]);

  useEffect(() => {
    const values = controlRef.current;
    const typingDelay = values["typingDelay"] as number;

    if (!textAreaFocused && configRef.current?.isPlaying) {
      simulateTyping(
        controlValues.textInput as string,
        typingDelay,
        true,
        typingTimeoutRef
      );
    }

    return () => {
      typingTimeoutRef.current.forEach(clearTimeout);
      typingTimeoutRef.current = [];
    };
  }, [config, controlValues, textAreaFocused]);

  // Reinitialise if config/controlValues change
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const values = controlRef.current;
      const size = values["size"] as number;
      // const cols = values["cols"] as number;
      // const rows = values["rows"] as number;
      const cols = Math.floor(canvas.width / size) + 1;
      const rows = Math.floor(canvas.height / size) + 1;
      dimsRef.current = { cols, rows };
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
