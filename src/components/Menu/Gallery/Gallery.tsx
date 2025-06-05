import { useEffect, useState } from "react";
import { useActiveProject } from "../../../context/ActiveProjectContext";
import { loadProject } from "../../../lib/loadProject";
import { loadProjects } from "../../../lib/loadProjects";
import {
  ProjectCategory,
  ProjectConfig,
  projectCategories,
} from "../../../lib/types";
import ProjectCard from "../../ProjectCard/ProjectCard";
import { Input } from "../../ui/input";

const Gallery = () => {
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
    if (project.slug === activeConfig?.slug) {
      return;
    }

    const loadedProject = await loadProject(project.slug);
    if (loadedProject) {
      setProject(loadedProject);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearchTitle = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSearchDescription = project.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      project.categories.includes(selectedCategory);

    return (matchesSearchTitle || matchesSearchDescription) && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-2 py-1 rounded-md"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as ProjectCategory | "All")
          }
        >
          <option value="All">All</option>
          {projectCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {filteredProjects.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          isActive={activeConfig?.slug === project.slug}
          onClick={() => handleProjectClick(project)}
        />
      ))}

      {filteredProjects.length === 0 && (
        <div className="text-sm text-gray-500">No projects found.</div>
      )}
    </div>
  );
};

export default Gallery;
