import { memo } from "react";
import { Label } from "../../../ui/label";
import { Slider } from "../../../ui/slider";
import { useControls } from "../useControls";

interface SliderControlProps {
  keyId: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

const SliderControl = memo(
  ({ keyId, label, min, max, step }: SliderControlProps) => {
    const { values, handleSliderChange } = useControls();
    const value = values[keyId];

    return (
      <div>
        <div className="flex justify-between items-center mb-sm">
          <Label>{label}</Label>
          <p>{value}</p>
        </div>
        <Slider
          value={[value as number]}
          onValueChange={(v) => handleSliderChange(keyId, v)}
          min={min}
          max={max}
          step={step}
        />
      </div>
    );
  }
);

export default SliderControl;
