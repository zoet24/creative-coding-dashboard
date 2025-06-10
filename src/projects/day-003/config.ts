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
          defaultValue: 20,
        },
      ],
    },
  ],
};

export default config;
