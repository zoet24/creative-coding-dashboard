import { useControls } from "../components/Menu/Controls/useControls";
import { useActiveProject } from "../context/ActiveProjectContext";

export const useProjectControlValues = () => {
  const { config } = useActiveProject();
  const controlGroups = config?.controls ?? [];
  const { values } = useControls(controlGroups);

  const result: Record<string, number | boolean> = {};

  controlGroups.forEach((group, groupIndex) => {
    group.controls.forEach((control, controlIndex) => {
      const key = control.id ?? `${groupIndex}-${controlIndex}`;
      result[control.id ?? key] = values[key];
    });
  });

  return result;
};
