import { ProjectConfig } from "./types";

export const loadProjects = async (): Promise<ProjectConfig[]> => {
  const configFiles = import.meta.glob("../projects/project-*/config.ts");

  const loadedProjects: ProjectConfig[] = [];

  for (const path in configFiles) {
    const module: any = await configFiles[path]();
    loadedProjects.push(module.default);
  }

  return loadedProjects;
};
