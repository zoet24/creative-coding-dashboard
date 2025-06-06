import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Day 01 - Spiral",
  description: "A hypnotic animated spiral",
  categories: ["Visual", "Generative"],
  slug: "day-001",
  controls: [
    {
      group: "Visual",
      controls: [
        {
          type: "slider",
          label: "Particle Count",
          defaultValue: 50,
          max: 100,
          step: 1,
        },
        {
          type: "slider",
          label: "Particle Size",
          defaultValue: 25,
          max: 100,
          step: 1,
        },
      ],
    },
    {
      group: "Physics",
      controls: [
        {
          type: "slider",
          label: "Gravity",
          defaultValue: 25,
          max: 100,
          step: 1,
        },
      ],
    },
    {
      group: "Input",
      controls: [
        {
          type: "toggle",
          label: "Enable Motion",
          defaultValue: false,
        },
      ],
    },
  ],
};

export default config;
