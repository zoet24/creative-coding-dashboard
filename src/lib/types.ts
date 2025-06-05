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
};
