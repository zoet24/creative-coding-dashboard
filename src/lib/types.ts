type ProjectCategory =
  | "Visual"
  | "Generative"
  | "Physics"
  | "Sound"
  | "Interaction"
  | "Other";

type ProjectConfig = {
  title: string;
  description: string;
  categories: ProjectCategory[];
  slug: string;
};
