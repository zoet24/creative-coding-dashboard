import { useEffect, useState } from "react";
import { loadDefaultProject } from "../../lib/loadDefaultProject";
import { ProjectComponent } from "../../lib/types";

const Canvas = () => {
  const [ActiveProject, setActiveProject] = useState<ProjectComponent | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      const project = await loadDefaultProject();
      setActiveProject(() => project);
    };

    load();
  }, []);

  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      {ActiveProject ? (
        <ActiveProject />
      ) : (
        <p className="text-center pt-20">Loading canvas...</p> // TOZO: Add loading state
      )}
    </div>
  );
};

export default Canvas;
