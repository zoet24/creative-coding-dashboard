import { ProjectCategory, projectCategories } from "../../../lib/types";
import ProjectCard from "../../ProjectCard/ProjectCard";
import { Input } from "../../ui/input";
import { useGallery } from "./useGallery";

const Gallery = () => {
  const {
    activeConfig,
    filteredProjects,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleProjectClick,
  } = useGallery();

  return (
    <div className="mt-lg">
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
      <div className="space-y-md mt-md">
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
    </div>
  );
};

export default Gallery;
