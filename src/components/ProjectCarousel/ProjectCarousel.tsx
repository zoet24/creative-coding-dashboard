import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Button } from "../ui/button";
import { useProjectCarousel } from "./useProjectCarousel";

const ProjectCarousel = () => {
  const { currentProject, isLoading, goNext, goPrev } = useProjectCarousel();

  if (isLoading || !currentProject) {
    return;
  }

  return (
    <div className="relative flex items-center mx-lg">
      <div className="flex-1">
        <ProjectCard project={currentProject} isActive={true} />
      </div>
      <div className="absolute left-[-16px]">
        <Button onClick={goPrev} aria-label="Previous project" size={"icon"}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute right-[-16px]">
        <Button onClick={goNext} aria-label="Next project" size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
