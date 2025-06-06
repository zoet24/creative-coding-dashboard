import { useEffect, useState } from "react";
import { useActiveProject } from "../../../context/ActiveProjectContext";
import { loadProject } from "../../../lib/loadProject";
import { loadProjects } from "../../../lib/loadProjects";
import { ProjectCategory, ProjectConfig } from "../../../lib/types";

export const useGallery = () => {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "All"
  >("All");
  const { setProject, config: activeConfig } = useActiveProject();

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  const handleProjectClick = async (project: ProjectConfig) => {
    if (project.slug === activeConfig?.slug) return;

    const loadedProject = await loadProject(project.slug);
    if (loadedProject) setProject(loadedProject);
  };

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "All" ||
      project.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return {
    activeConfig,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleProjectClick,
  };
};
