import { useEffect, useState } from "react";
import { loadProjects } from "../../../lib/loadProjects";
import { ProjectConfig, projectCategories } from "../../../lib/types";
import ProjectCard from "../../ProjectCard/ProjectCard";
import { Input } from "../../ui/input";

const Gallery = () => {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <Input placeholder="Search..." />
        <select className="border px-2 py-1 rounded-md">
          <option value="All">All</option>
          {projectCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  );
};

export default Gallery;
