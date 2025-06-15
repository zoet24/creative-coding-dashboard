import { RotateCcw, Shuffle } from "lucide-react";
import { useActiveProject } from "../../../context/ActiveProjectContext";
import EmptyState from "../../EmptyState/EmptyState";
import { Button } from "../../ui/button";
import SliderControl from "./SliderControl/SliderControl";
import ToggleControl from "./ToggleControl/ToggleControl";

const Controls = () => {
  const {
    config: activeProject,
    randomiseControls,
    resetControls,
  } = useActiveProject();
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

              if (control.type === "toggle") {
                return (
                  <ToggleControl key={key} keyId={key} label={control.label} />
                );
              }

              return null;

              // TOZO: More controls
            })}

            {controlGroups.length > 0 ? (
              <div className="flex gap-md !mt-lg">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={randomiseControls}
                >
                  <Shuffle className="mr-xxs" />
                  Randomise
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={resetControls}
                >
                  <RotateCcw className="mr-xxs" />
                  Reset
                </Button>
              </div>
            ) : (
              <EmptyState
                text={`${
                  activeProject ? activeProject.title : "This project"
                } doesn't have
        any controls.`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Controls;
