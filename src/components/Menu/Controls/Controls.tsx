import { useActiveProject } from "../../../context/ActiveProjectContext";
import SliderControl from "./SliderControl/SliderControl";

const Controls = () => {
  const { config: activeProject } = useActiveProject();
  const controlGroups = activeProject?.controls ?? [];

  return (
    <div className="space-y-lg mt-lg">
      {controlGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border-2 rounded-sm p-md">
          <h3 className="font-semibold text-sm uppercase tracking-wider">
            {group.group}
          </h3>
          <div className="space-y-md mt-sm">
            {group.controls.map((control, controlIndex) => {
              const key = control.id ?? `${groupIndex}-${controlIndex}`;

              if (control.type === "slider") {
                return (
                  <SliderControl
                    key={key}
                    keyId={key}
                    label={control.label}
                    min={control.min ?? 0}
                    max={control.max ?? 100}
                    step={control.step ?? 1}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Controls;
