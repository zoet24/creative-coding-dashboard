// Get index of surrounding tiles
export const getNeighbourIndices = (
  index: number,
  cols: number,
  rows: number
) => {
  const neighbours: number[] = [];
  const x = index % cols;
  const y = Math.floor(index / cols);

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue; // skip center

      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        neighbours.push(ny * cols + nx);
      }
    }
  }

  return neighbours;
};
