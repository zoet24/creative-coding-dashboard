import { useEffect, useState } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { loadProject } from "../../lib/loadProject";
import { loadProjects } from "../../lib/loadProjects";
import { ProjectConfig } from "../../lib/types";

export const useProjectCarousel = () => {
  const { config: activeConfig, setProject } = useActiveProject();
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadProjects().then((loaded) => {
      setProjects(loaded);
      if (activeConfig) {
        const idx = loaded.findIndex((p) => p.slug === activeConfig.slug);
        setCurrentIndex(idx >= 0 ? idx : 0);
      }
    });
  }, []);

  useEffect(() => {
    if (!projects.length || !activeConfig) return;

    const idx = projects.findIndex((p) => p.slug === activeConfig.slug);
    if (idx >= 0 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [activeConfig, projects]);

  useEffect(() => {
    if (!projects.length) return;
    const project = projects[currentIndex];
    if (project) {
      loadProject(project.slug).then((loaded) => {
        if (loaded) setProject(loaded);
      });
    }
  }, [currentIndex, projects, setProject]);

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % projects.length);
  };

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return {
    projects,
    currentProject,
    isLoading: projects.length === 0,
    goNext,
    goPrev,
  };
};
