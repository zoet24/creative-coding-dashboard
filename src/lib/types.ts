// Controls
export type SliderControl = {
  type: "slider";
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
};

export type ToggleControl = {
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
  controls?: ControlGroup[];
};

export type ProjectComponent = React.FC;
