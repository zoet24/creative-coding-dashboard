import { RotateCcw, Shuffle } from "lucide-react";
import { useActiveProject } from "../../../context/ActiveProjectContext";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";
import { useControls } from "./useControls";

const Controls = () => {
  const { config: activeProject } = useActiveProject();
  const controlGroups = activeProject?.controls ?? [];

  const {
    values,
    handleSliderChange,
    handleToggleChange,
    handleReset,
    handleRandomise,
  } = useControls(controlGroups);

  return (
    <div className="space-y-lg mt-lg">
      {controlGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border-2 rounded-sm p-md">
          <h3 className="font-semibold text-sm uppercase tracking-wider">
            {group.group}
          </h3>
          <div className="space-y-md mt-sm">
            {group.controls.map((control, controlIndex) => {
              const key = `${groupIndex}-${controlIndex}`;
              const value = values[key];

              if (control.type === "slider" && typeof value === "number") {
                return (
                  <div key={key}>
                    <Label>{control.label}</Label>
                    <Slider
                      value={[value]}
                      onValueChange={(v) => handleSliderChange(key, v)}
                      min={control.min ?? 0}
                      max={control.max ?? 100}
                      step={control.step ?? 1}
                    />
                  </div>
                );
              }

              if (control.type === "toggle" && typeof value === "boolean") {
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4"
                  >
                    <Label>{control.label}</Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(v) => handleToggleChange(key, v)}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      ))}

      {controlGroups.length > 0 ? (
        <div className="flex gap-md">
          <Button className="w-full" variant="default" onClick={handleReset}>
            <RotateCcw className="mr-xxs" />
            Reset
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={handleRandomise}
          >
            <Shuffle className="mr-xxs" />
            Randomise
          </Button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">
          {activeProject ? activeProject.title : "This project"} doesn't have
          any controls.
        </div> // TOZO: Add empty state component
      )}
    </div>
  );
};

export default Controls;
