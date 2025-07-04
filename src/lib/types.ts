// Controls
export type SliderControl = {
  id: string;
  type: "slider";
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
};

export type ToggleControl = {
  id: string;
  type: "toggle";
  label: string;
  defaultValue: boolean;
};

export type ColourControl = {
  id: string;
  type: "colour";
  label: string;
  defaultValue: string;
};

export type SelectControl = {
  id: string;
  type: "select";
  label: string;
  defaultValue: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type TextAreaControl = {
  id: string;
  type: "textarea";
  label: string;
  defaultValue: string;
};

export type Control =
  | SliderControl
  | ToggleControl
  | ColourControl
  | SelectControl
  | TextAreaControl;

export type ControlGroup = {
  group: string;
  controls: Control[];
};

// Projects
export const projectCategories = [
  "Generative",
  "Waves",
  "Physics",
  "Visual",
  "Noise",
  "Colour",
  "Landscape",
  "Interaction",
  "Animation",
  "Text",
  "Grid",
  "Keyboard",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectConfig = {
  title: string;
  description: string;
  categories: ProjectCategory[];
  slug: string;
  isPlaying: boolean;
  isAnimated?: boolean;
  isPublished?: boolean;
  controls?: ControlGroup[];
};

export type ProjectComponent = React.FC;
