import { memo } from "react";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { useControls } from "../useControls";

interface ToggleControlProps {
  keyId: string;
  label: string;
}

const ToggleControl = memo(({ keyId, label }: ToggleControlProps) => {
  const { values, handleToggleChange } = useControls();
  const value = values[keyId] as boolean;

  return (
    <div className="flex justify-between items-center gap-sm py-1">
      <Label htmlFor={keyId}>{label}</Label>
      <Switch
        id={keyId}
        checked={value}
        onCheckedChange={(checked) => handleToggleChange(keyId, checked)}
      />
    </div>
  );
});

export default ToggleControl;
