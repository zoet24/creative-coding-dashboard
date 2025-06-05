import ProjectCard from "../ProjectCard/ProjectCard";
import { Button } from "../ui/button";
import { useProjectCarousel } from "./useProjectCarousel";

const ProjectCarousel = () => {
  const { currentProject, isLoading, goNext, goPrev } = useProjectCarousel();

  if (isLoading || !currentProject) {
    return <div>Loading projects...</div>; // TOZO: Add loading animation
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <ProjectCard project={currentProject} isActive={true} />
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
