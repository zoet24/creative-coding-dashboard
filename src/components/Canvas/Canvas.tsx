import { useActiveProject } from "../../context/ActiveProjectContext";
import Loading from "../Loading/Loading";

const Canvas = () => {
  const { component: ActiveProject } = useActiveProject();

  return (
    <div
      className="w-full h-full bg-white flex items-center justify-center"
      id="project-display"
    >
      {ActiveProject ? <ActiveProject /> : <Loading />}
    </div>
  );
};

export default Canvas;
