import { useActiveProject } from "../../../context/ActiveProjectContext";

type ControlValue = number | boolean;

export const useControls = () => {
  const { controlValues: values, updateControlValue } = useActiveProject();

  const handleSliderChange = (key: string, val: number[]) => {
    console.log("handleSliderChange", val);
    updateControlValue(key, val[0]);
  };

  return { values, handleSliderChange };
};
