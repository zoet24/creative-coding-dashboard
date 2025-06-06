import { useActiveProject } from "../../../context/ActiveProjectContext";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";

const Controls = () => {
  const { config: activeProject } = useActiveProject();
  const controlGroups = activeProject?.controls ?? [];
  console.log(activeProject);

  return (
    <div className="space-y-lg mt-lg">
      {controlGroups.map((group, i) => (
        <>
          <div key={i} className="border-2 rounded-sm p-md">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              {group.group}
            </h3>
            <div className="space-y-md mt-sm">
              {group.controls.map((control, j) => {
                if (control.type === "slider") {
                  return (
                    <div key={j}>
                      <Label>{control.label}</Label>
                      <Slider
                        defaultValue={[control.defaultValue]}
                        min={control.min ?? 0}
                        max={control.max ?? 100}
                        step={control.step ?? 1}
                      />
                    </div>
                  );
                }

                if (control.type === "toggle") {
                  return (
                    <div
                      key={j}
                      className="flex items-center justify-between gap-4"
                    >
                      <Label>{control.label}</Label>
                      <Switch defaultChecked={control.defaultValue} />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
          <div className="flex gap-md">
            <Button className="w-full" variant="default">
              Reset
            </Button>
            <Button className="w-full" variant="outline">
              Randomise
            </Button>
          </div>
        </>
      ))}
      {controlGroups.length === 0 && (
        <div className="text-sm text-gray-500">
          {activeProject ? activeProject.title : "This project"} doesn't have
          any controls.
        </div> // TOZO: Add empty state component
      )}
    </div>
  );
};

export default Controls;
