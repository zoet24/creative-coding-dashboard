import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";

const Controls = () => {
  return (
    <div className="space-y-lg mt-lg">
      <div className="border-2 rounded-sm p-md">
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          Visual
        </h3>
        <div className="space-y-md">
          <div>
            <Label htmlFor="visual-slider">Particle Count</Label>
            <Slider id="visual-slider" defaultValue={[50]} max={100} step={1} />
          </div>
          <div>
            <Label htmlFor="visual-slider-2">Particle Count 2</Label>
            <Slider
              id="visual-slider-2"
              defaultValue={[25]}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
      <div className="border-2 rounded-sm p-md">
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          Physics
        </h3>
        <div className="space-y-md">
          <div>
            <Label htmlFor="physics-slider">Gravity</Label>
            <Slider
              id="physics-slider"
              defaultValue={[25]}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
      <div className="border-2 rounded-sm p-md">
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          Input
        </h3>
        <div className="space-y-md">
          <div className="flex items-center gap-4">
            <Switch id="motion-toggle" />
            <Label htmlFor="motion-toggle">Enable Motion</Label>
          </div>
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
    </div>
  );
};

export default Controls;
