import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Tractor",
  description: "A woman and her tractor",
  categories: ["Landscape", "Interaction", "Animation"],
  slug: "project-003",
  isPlaying: true,
  isAnimated: true,
  controls: [
    {
      group: "Environment",
      controls: [
        {
          id: "toggleSlope",
          type: "toggle",
          label: "Slope",
          defaultValue: false,
        },
      ],
    },
  ],
};

export default config;
