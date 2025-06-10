import { loadProject } from "@/lib/loadProject";
import { ControlGroup, ProjectConfig } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { WORKING_PROJECT } from "../constants/app";

type ControlValue = number | boolean;
type ControlValues = Record<string, ControlValue>;

interface ActiveProjectContextType {
  component: React.FC | null;
  config: ProjectConfig | null;
  controlValues: ControlValues;
  updateControlValue: (key: string, value: ControlValue) => void;
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
  const [controlValues, setControlValues] = useState<ControlValues>({});

  const initControlValues = (controlGroups: ControlGroup[]): ControlValues => {
    const values: ControlValues = {};
    controlGroups.forEach((group, groupIndex) => {
      group.controls.forEach((control, controlIndex) => {
        const key = control.id ?? `${groupIndex}-${controlIndex}`;
        values[key] = control.defaultValue;
      });
    });
    return values;
  };

  const setProject = ({
    component,
    config: newConfig,
  }: {
    component: React.FC;
    config: ProjectConfig;
  }) => {
    if (config?.title === newConfig.title) return;

    setComponent(() => component);
    setConfig(newConfig);
    const initialValues = initControlValues(newConfig.controls ?? []);
    setControlValues(initialValues);
  };

  const setIsPlaying = (playing: boolean) => {
    setConfig((prev) => (prev ? { ...prev, isPlaying: playing } : prev));
  };

  const updateControlValue = (key: string, value: ControlValue) => {
    setControlValues((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  useEffect(() => {
    const load = async () => {
      if (config) return;
      const defaultProject = await loadProject(WORKING_PROJECT);
      if (defaultProject) {
        setProject(defaultProject);
      }
    };
    load();
  }, [config]);

  return (
    <ActiveProjectContext.Provider
      value={{
        component,
        config,
        controlValues,
        updateControlValue,
        setProject,
        setIsPlaying,
      }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
};
