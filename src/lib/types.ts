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

export type Control = SliderControl | ToggleControl;

export type ControlGroup = {
  group: string;
  controls: Control[];
};

// Projects
export const projectCategories = [
  "Visual",
  "Physics",
  "Audio",
  "Interaction",
  "Simulation",
  "Generative",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectConfig = {
  title: string;
  description: string;
  categories: ProjectCategory[];
  slug: string;
  isPlaying: boolean;
  controls?: ControlGroup[];
};

export type ProjectComponent = React.FC;
