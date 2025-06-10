import { useActiveProject } from "../../../context/ActiveProjectContext";

type ControlValue = number | boolean;

export const useControls = () => {
  const { controlValues: values } = useActiveProject();

  return { values };
};
