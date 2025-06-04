import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Switch } from "../../ui/switch";

const Controls = () => {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="font-semibold text-sm">Visual</h3>
        <Label htmlFor="visual-slider">Particle Count</Label>
        <Slider id="visual-slider" defaultValue={[50]} max={100} step={1} />
      </div>
      <div>
        <h3 className="font-semibold text-sm">Physics</h3>
        <Label htmlFor="physics-slider">Gravity</Label>
        <Slider id="physics-slider" defaultValue={[25]} max={100} step={1} />
      </div>
      <div>
        <h3 className="font-semibold text-sm">Input</h3>
        <div className="flex items-center gap-4">
          <Switch id="motion-toggle" />
          <Label htmlFor="motion-toggle">Enable Motion</Label>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="default" size="sm">
          Reset
        </Button>
        <Button variant="outline" size="sm">
          Randomise
        </Button>
      </div>
    </div>
  );
};

export default Controls;
