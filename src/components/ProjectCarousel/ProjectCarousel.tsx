import { useEffect, useState } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { loadProject } from "../../lib/loadProject";
import { loadProjects } from "../../lib/loadProjects";
import { ProjectConfig } from "../../lib/types";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Button } from "../ui/button";

const ProjectCarousel = () => {
  const { config: activeConfig, setProject } = useActiveProject();
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load all projects once
  useEffect(() => {
    loadProjects().then((loadedProjects) => {
      setProjects(loadedProjects);

      // If there's an active project, find its index
      if (activeConfig) {
        const idx = loadedProjects.findIndex(
          (p) => p.slug === activeConfig.slug
        );
        setCurrentIndex(idx >= 0 ? idx : 0);
      }
    });
  }, [activeConfig]);

  // When currentIndex changes, load that project and set it active
  useEffect(() => {
    if (projects.length === 0) return;

    const projectToLoad = projects[currentIndex];
    if (!projectToLoad) return;

    // Load and set active project
    loadProject(projectToLoad.slug).then((loaded) => {
      if (loaded) {
        setProject(loaded);
      }
    });
  }, [currentIndex, projects, setProject]);

  // Navigation handlers
  const goNext = () => {
    setCurrentIndex((idx) => (idx + 1) % projects.length);
  };
  const goPrev = () => {
    setCurrentIndex((idx) => (idx - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return <div>Loading projects...</div>; // TOZO: Add loading states
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <ProjectCard project={projects[currentIndex]} isActive={true} />
      <div className="flex space-x-2">
        <Button onClick={goPrev} aria-label="Previous project">
          Prev
        </Button>
        <Button onClick={goNext} aria-label="Next project">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
