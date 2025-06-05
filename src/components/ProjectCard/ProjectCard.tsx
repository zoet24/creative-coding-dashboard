import { ProjectConfig } from "../../lib/types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface ProjectCardProps {
  project: ProjectConfig;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="p-4 border-2 border-green-500">
      <h4 className="font-bold">{project.title}</h4>
      <p className="text-sm">{project.description}</p>
      <div className="flex gap-1 mt-2 flex-wrap">
        {project.categories.map((cat, i) => (
          <Badge key={i}>{cat}</Badge>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;
