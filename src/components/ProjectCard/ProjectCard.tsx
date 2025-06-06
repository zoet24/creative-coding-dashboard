import { ProjectConfig } from "../../lib/types";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

interface ProjectCardProps {
  project: ProjectConfig;
  isActive: boolean;
  onClick?: () => void;
}

const ProjectCard = ({ project, isActive, onClick }: ProjectCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`p-lg border-2 cursor-pointer transition-colors duration-200 text-center shadow-md ${
        isActive ? "border-green-500" : "border-black"
      }`}
    >
      <h4 className="font-bold">{project.title}</h4>
      <p className="text-sm">{project.description}</p>
      <div className="flex justify-center gap-sm mt-sm flex-wrap">
        {project.categories.map((cat, i) => (
          <Badge key={i}>{cat}</Badge>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;
