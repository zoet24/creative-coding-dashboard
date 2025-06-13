import { useEffect, useMemo, useRef } from "react";
import { useActiveProject } from "../context/ActiveProjectContext";

export const useControlValue = () => {
  const { controlValues, config } = useActiveProject();
  const ref = useRef(controlValues);

  useEffect(() => {
    ref.current = controlValues;
  }, [controlValues]);

  const defaultValues = useMemo(() => {
    const values: Record<string, number> = {};

    if (!config?.controls) return values;

    config.controls.forEach((group) => {
      group.controls.forEach((control) => {
        if ("id" in control && typeof control.defaultValue === "number") {
          values[control.id] = control.defaultValue;
        }
      });
    });

    return values;
  }, [config]);

  const get = (id: string): number => {
    return (ref.current[id] as number | undefined) ?? defaultValues[id] ?? 0;
  };

  return { get };
};
