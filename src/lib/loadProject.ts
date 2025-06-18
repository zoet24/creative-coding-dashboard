const projectImports: Record<string, () => Promise<any>> = {
  "project-001": () => import("../projects/project-001/index"),
  "project-002": () => import("../projects/project-002/index"),
  // Add all projects here
};

const configImports: Record<string, () => Promise<any>> = {
  "project-001": () => import("../projects/project-001/config"),
  "project-002": () => import("../projects/project-002/config"),
  // Same here
};

export const loadProject = async (projectNumber: string) => {
  try {
    const importProject = projectImports[projectNumber];
    const importConfig = configImports[projectNumber];

    if (!importProject || !importConfig) {
      throw new Error(`Project ${projectNumber} not found`);
    }

    const projectModule = await importProject();
    const configModule = await importConfig();

    return {
      component: projectModule.default,
      config: configModule.default,
    };
  } catch (error) {
    console.error("Failed to load default project:", error);
    return null;
  }
};
