import { colourSchemes } from "./colours";

export const getTimeOfDay = (): keyof typeof colourSchemes => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 18) return "day";
  if (hour >= 18 && hour < 21) return "sundown";
  return "night";
};
