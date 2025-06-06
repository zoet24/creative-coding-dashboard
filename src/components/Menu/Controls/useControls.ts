import { ControlGroup } from "@/lib/types";
import { useMemo, useState } from "react";

type ControlValue = number | boolean;

export const useControls = (controlGroups: ControlGroup[]) => {
  const getInitialValues = (groups: ControlGroup[]) => {
    const values: Record<string, ControlValue> = {};
    groups.forEach((group, groupIndex) => {
      group.controls.forEach((control, controlIndex) => {
        const key = `${groupIndex}-${controlIndex}`;
        values[key] = control.defaultValue;
      });
    });
    return values;
  };

  const initialValues = useMemo(
    () => getInitialValues(controlGroups),
    [controlGroups]
  );
  const [values, setValues] =
    useState<Record<string, ControlValue>>(initialValues);

  const handleSliderChange = (key: string, val: number[]) => {
    setValues((prev) => ({ ...prev, [key]: val[0] }));
  };

  const handleToggleChange = (key: string, val: boolean) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setValues(initialValues);
  };

  const handleRandomise = () => {
    const newValues: Record<string, ControlValue> = {};
    controlGroups.forEach((group, groupIndex) => {
      group.controls.forEach((control, controlIndex) => {
        const key = `${groupIndex}-${controlIndex}`;
        if (control.type === "slider") {
          const min = control.min ?? 0;
          const max = control.max ?? 100;
          newValues[key] = Math.floor(Math.random() * (max - min + 1)) + min;
        } else if (control.type === "toggle") {
          newValues[key] = Math.random() > 0.5;
        }
      });
    });
    setValues(newValues);
  };

  return {
    values,
    handleSliderChange,
    handleToggleChange,
    handleReset,
    handleRandomise,
  };
};
