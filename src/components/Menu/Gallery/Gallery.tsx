import { useEffect, useState } from "react";
import { loadProjects } from "../../../lib/loadProjects";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
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
          <option>All</option>
          <option>Visual</option>
          <option>Physics</option>
        </select>
      </div>
      {projects.map((project, i) => (
        <Card key={i} className="p-4 border-2 border-green-500">
          <h4 className="font-bold">{project.title}</h4>
          <p className="text-sm">{project.description}</p>
          <div className="flex gap-1 mt-2 flex-wrap">
            {project.categories.map((cat, i) => (
              <Badge key={i}>{cat}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
