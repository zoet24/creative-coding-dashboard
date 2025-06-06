import { useActiveProject } from "../../context/ActiveProjectContext";

const Canvas = () => {
  const { component: ActiveProject } = useActiveProject();

  return (
    <div
      className="w-full h-full bg-white flex items-center justify-center"
      id="project-display"
    >
      {ActiveProject ? (
        <ActiveProject />
      ) : (
        <p className="text-center pt-20">Loading canvas...</p> // TOZO: Add loading state
      )}
    </div>
  );
};

export default Canvas;
