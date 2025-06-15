import { useActiveProject } from "../../../context/ActiveProjectContext";

export const useControls = () => {
  const { controlValues: values, updateControlValue } = useActiveProject();

  const handleSliderChange = (key: string, val: number[]) => {
    updateControlValue(key, val[0]);
  };

  const handleToggleChange = (key: string, val: boolean) => {
    updateControlValue(key, val);
  };

  const handleColourChange = (key: string, val: string) => {
    updateControlValue(key, val);
  };

  return { values, handleSliderChange, handleToggleChange, handleColourChange };
};
