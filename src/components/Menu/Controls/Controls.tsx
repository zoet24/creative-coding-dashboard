import { RotateCcw, Shuffle } from "lucide-react";
import { useActiveProject } from "../../../context/ActiveProjectContext";
import {
  isColourControl,
  isSelectControl,
  isSliderControl,
  isToggleControl,
} from "../../../lib/controlTypeGuards";
import EmptyState from "../../EmptyState/EmptyState";
import { Button } from "../../ui/button";
import ColourControl from "./ColourControl/ColourControl";
import SelectControl from "./SelectControl/SelectControl";
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

              if (isSliderControl(control)) {
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

              if (isToggleControl(control)) {
                return (
                  <ToggleControl key={key} keyId={key} label={control.label} />
                );
              }

              if (isColourControl(control)) {
                return (
                  <ColourControl key={key} keyId={key} label={control.label} />
                );
              }

              if (isSelectControl(control)) {
                return (
                  <SelectControl
                    key={key}
                    keyId={key}
                    label={control.label}
                    options={control.options}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>
      ))}

      {controlGroups.length > 0 ? (
        <div className="flex gap-md">
          <Button
            className="w-full"
            variant="default"
            onClick={randomiseControls}
            size="sm"
          >
            <Shuffle className="mr-xxs" />
            <span className="hidden sm:block">Randomise</span>
          </Button>
          <Button
            className="w-full"
            variant="outline"
            size="sm"
            onClick={resetControls}
          >
            <RotateCcw className="mr-xxs" />
            <span className="hidden sm:block">Reset</span>
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
  );
};

export default Controls;
