import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Day 02 - Wavy wave",
  description: "Chill blue waves",
  categories: [],
  slug: "day-002",
  isPlaying: true,
  isAnimated: true,
  controls: [
    {
      group: "Input",
      controls: [
        {
          id: "amplitude",
          type: "slider",
          label: "Wave amplitude",
          defaultValue: 60,
          min: 0,
          max: 300,
          step: 5,
        },
        {
          id: "frequency",
          type: "slider",
          label: "Frequency",
          defaultValue: 0.005,
          min: 0.001,
          max: 0.05,
          step: 0.001,
        },
        {
          id: "noiseScale",
          type: "slider",
          label: "Noise scale",
          defaultValue: 0.01,
          min: 0.001,
          max: 0.1,
          step: 0.001,
        },
      ],
    },
  ],
};

export default config;
