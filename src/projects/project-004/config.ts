import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Keyboard",
  description: "A grid that reacts to text input",
  categories: ["Text", "Keyboard", "Grid"],
  slug: "project-004",
  isPlaying: true,
  isPublished: false,
  controls: [
    {
      group: "Grid",
      controls: [
        {
          id: "size",
          type: "slider",
          label: "Square size",
          defaultValue: 75,
          min: 25,
          max: 100,
          step: 5,
        },
        {
          id: "rows",
          type: "slider",
          label: "Number of rows",
          defaultValue: 10,
          min: 1,
          max: 30,
        },
        {
          id: "cols",
          type: "slider",
          label: "Number of columns",
          defaultValue: 10,
          min: 1,
          max: 30,
        },
      ],
    },
    {
      group: "Keyboard",
      controls: [
        {
          id: "scaleFactor",
          type: "slider",
          label: "Shrink/grow scale",
          defaultValue: 0.25,
          min: 0.01,
          max: 0.5,
          step: 0.01,
        },
      ],
    },
  ],
};

export default config;
