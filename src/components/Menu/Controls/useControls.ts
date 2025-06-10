import { useActiveProject } from "../../../context/ActiveProjectContext";

export const useControls = () => {
  const { controlValues: values, updateControlValue } = useActiveProject();

  const handleSliderChange = (key: string, val: number[]) => {
    updateControlValue(key, val[0]);
  };

  return { values, handleSliderChange };
};
