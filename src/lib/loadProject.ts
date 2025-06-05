export const loadProject = async (projectNumber: string) => {
  try {
    const module = await import(`../projects/${projectNumber}/index`);
    const config = (await import(`../projects/${projectNumber}/config`))
      .default;

    return {
      component: module.default,
      config,
    };
  } catch (error) {
    console.error("Failed to load default project:", error);
    return null;
  }
};
