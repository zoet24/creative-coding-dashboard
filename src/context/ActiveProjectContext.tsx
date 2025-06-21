import { loadProject } from "@/lib/loadProject";
import { ControlGroup, ProjectConfig } from "@/lib/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_PROJECT_PROD, WORKING_PROJECT } from "../constants/app";
import {
  isColourControl,
  isSliderControl,
  isToggleControl,
} from "../lib/controlTypeGuards";

type ControlValue = number | boolean | string;
type ControlValues = Record<string, ControlValue>;

interface ActiveProjectContextType {
  component: React.FC | null;
  config: ProjectConfig | null;
  controlValues: ControlValues;
  updateControlValue: (key: string, value: ControlValue) => void;
  randomiseControls: () => void;
  resetControls: () => void;
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
  const env = import.meta.env.VITE_ENV;
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
    if (config?.slug === newConfig.slug) return;

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

  const randomiseControls = () => {
    if (!config) return;

    const values: ControlValues = {};
    config.controls?.forEach((group, groupIndex) => {
      group.controls.forEach((control, controlIndex) => {
        const key = control.id ?? `${groupIndex}-${controlIndex}`;

        if (isSliderControl(control)) {
          const min = control.min ?? 0;
          const max = control.max ?? 100;
          const step = control.step ?? 1;

          const decimals = step.toString().includes(".")
            ? step.toString().split(".")[1].length
            : 0;

          const rangeSteps = Math.floor((max - min) / step);
          const randomStep = Math.floor(Math.random() * (rangeSteps + 1));
          const value = +(min + randomStep * step).toFixed(decimals);

          values[key] = value;
        }

        if (isToggleControl(control)) {
          values[key] = Math.random() < 0.5;
        }

        if (isColourControl(control)) {
          const randomHex = `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`;
          values[key] = randomHex;
        }
      });
    });

    setControlValues(values);
  };

  const resetControls = () => {
    if (!config) return;
    const initialValues = initControlValues(config.controls ?? []);
    setControlValues(initialValues);
  };

  useEffect(() => {
    const load = async () => {
      if (config) return;
      let defaultProject;

      if (env === "dev") {
        defaultProject = await loadProject(WORKING_PROJECT);
      } else {
        defaultProject = await loadProject(DEFAULT_PROJECT_PROD);
      }

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
        randomiseControls,
        resetControls,
        setProject,
        setIsPlaying,
      }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
};
