// Handle spacebar, convert single-character keys to uppercase, leave multi-character keys unchanged
export const normaliseKey = (key: string): string => {
  if (key === " ") return " ";
  return key.length === 1 ? key.toUpperCase() : key;
};

// Takes key from keyboard event, normalises input, activates function
export const activateMatchingKeys = <T extends { key: string }>(
  key: string,
  items: T[],
  activate: (item: T, index: number) => void
) => {
  const normalised = key.toUpperCase(); // or use `normaliseKey` if needed
  items.forEach((item, index) => {
    if (item.key === normalised) {
      activate(item, index);
    }
  });
};
