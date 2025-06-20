import { ComponentType } from "react";
import { ProjectConfig } from "./types";

const projectFiles = import.meta.glob("../projects/project-*/index.tsx");
const configFiles = import.meta.glob("../projects/project-*/config.ts");

export const loadProject = async (
  projectNumber: string
): Promise<{ component: ComponentType; config: ProjectConfig } | null> => {
  const projectKey = `../projects/${projectNumber}/index.tsx`;
  const configKey = `../projects/${projectNumber}/config.ts`;

  try {
    const importProject = projectFiles[projectKey];
    const importConfig = configFiles[configKey];

    if (!importProject || !importConfig) {
      throw new Error(`Project ${projectNumber} not found`);
    }

    const projectModule = (await importProject()) as { default: ComponentType };
    const configModule = (await importConfig()) as { default: ProjectConfig };

    return {
      component: projectModule.default,
      config: configModule.default,
    };
  } catch (error) {
    console.error("Failed to load default project:", error);
    return null;
  }
};
