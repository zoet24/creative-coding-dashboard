export const loadDefaultProject = async () => {
  const modules = import.meta.glob("@/projects/day-001/index.tsx");

  const paths = Object.keys(modules);

  if (paths.length > 0) {
    const module: any = await modules[paths[0]]();
    return module.default;
  }

  return null;
};
