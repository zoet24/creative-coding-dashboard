import { loadProject } from "@/lib/loadProject";
import { ProjectConfig } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ActiveProjectContextType {
  component: React.FC | null;
  config: ProjectConfig | null;
  setProject: (project: { component: React.FC; config: ProjectConfig }) => void;
  setIsPlaying: (playing: boolean) => void;
}

const ActiveProjectContext = createContext<
  ActiveProjectContextType | undefined
>(undefined);

export const useActiveProject = () => {
  const context = useContext(ActiveProjectContext);
  if (!context)
    throw new Error(
      "useActiveProject must be used within ActiveProjectProvider"
    );
  return context;
};

export const ActiveProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [component, setComponent] = useState<React.FC | null>(null);
  const [config, setConfig] = useState<ProjectConfig | null>(null);

  const setProject = ({
    component,
    config,
  }: {
    component: React.FC;
    config: ProjectConfig;
  }) => {
    setComponent(() => component);
    setConfig(config);
  };

  const setIsPlaying = (playing: boolean) => {
    setConfig((prev) => (prev ? { ...prev, isPlaying: playing } : prev));
  };

  useEffect(() => {
    const load = async () => {
      const defaultProject = await loadProject("day-002");
      if (defaultProject) {
        setProject(defaultProject);
      }
    };
    load();
  }, []);

  useEffect(() => {
    console.log(config);
  }, [config]);

  return (
    <ActiveProjectContext.Provider
      value={{ component, config, setProject, setIsPlaying }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
};
