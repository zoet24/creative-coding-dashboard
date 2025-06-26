import { memo } from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useControls } from "../useControls";

interface ColourControlProps {
  keyId: string;
  label: string;
}

const ColourControl = memo(({ keyId, label }: ColourControlProps) => {
  const { values, handleColourChange } = useControls();
  const rawValue = values[keyId];
  const value = typeof rawValue === "string" ? rawValue : "#000000";

  return (
    <div className="flex justify-between items-center gap-sm py-1">
      <Label htmlFor={keyId}>{label}</Label>
      <Input
        type="color"
        id={keyId}
        value={value}
        onChange={(e) => handleColourChange(keyId, e.target.value)}
        className="w-8 h-8 p-0 border-none bg-transparent"
      />
    </div>
  );
});

export default ColourControl;
