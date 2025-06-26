import { ProjectConfig } from "../../lib/types";

const config: ProjectConfig = {
  title: "Typewriter",
  description: "A grid that reacts to text input",
  categories: ["Text", "Keyboard", "Grid"],
  slug: "project-004",
  isPlaying: true,
  isAnimated: true,
  isPublished: false,
  controls: [
    {
      group: "Grid",
      controls: [
        {
          id: "size",
          type: "slider",
          label: "Square size",
          defaultValue: 25,
          min: 10,
          max: 100,
          step: 5,
        },
        {
          id: "colourPalette",
          type: "select",
          label: "Colour palette",
          defaultValue: "ocean",
          options: [
            { label: "Cool Ocean", value: "ocean" },
            { label: "Warm Autumn", value: "autumn" },
            { label: "Soft Forest", value: "forest" },
            { label: "Dreamy Purple", value: "purple" },
            { label: "Lava Glow", value: "lava" },
          ],
        },
        // {
        //   id: "rows",
        //   type: "slider",
        //   label: "Number of rows",
        //   defaultValue: 7,
        //   min: 1,
        //   max: 50,
        // },
        // {
        //   id: "cols",
        //   type: "slider",
        //   label: "Number of columns",
        //   defaultValue: 7,
        //   min: 1,
        //   max: 50,
        // },
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
        {
          id: "typingDelay",
          type: "slider",
          label: "Typing delay",
          defaultValue: 150,
          min: 10,
          max: 1000,
          step: 10,
        },
        {
          id: "textInput",
          type: "textarea",
          label: "Text input",
          defaultValue: "Typewriter, typewriter, type me some type...",
        },
      ],
    },
  ],
};

export default config;
