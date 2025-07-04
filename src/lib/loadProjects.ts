import { ProjectConfig } from "./types";

export const loadProjects = async (): Promise<ProjectConfig[]> => {
  const env = import.meta.env.VITE_ENV;
  const configFiles = import.meta.glob("../projects/project-*/config.ts");
  const loadedProjects: ProjectConfig[] = [];

  for (const path in configFiles) {
    const module: any = await configFiles[path]();
    loadedProjects.push(module.default);
  }

  const publishedProjects = loadedProjects.filter((project) => {
    if (env === "dev") return true;
    return project.isPublished !== false;
  });

  return publishedProjects;
};
