import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Day 03 - Sludge Colour",
  description: "Colourful sludge animation",
  categories: [],
  slug: "day-003",
  isPlaying: true,
  controls: [
    {
      group: "Input",
      controls: [
        {
          id: "amplitude",
          type: "slider",
          label: "Wave amplitude",
          defaultValue: 60,
        },
        {
          id: "frequency",
          type: "slider",
          label: "Frequency",
          defaultValue: 0.005,
          min: 0,
          max: 0.01,
          step: 0.001,
        },
        {
          id: "noiseScale",
          type: "slider",
          label: "Noise scale",
          defaultValue: 0.01,
          min: 0,
          max: 0.1,
          step: 0.001,
        },
      ],
    },
  ],
};

export default config;
