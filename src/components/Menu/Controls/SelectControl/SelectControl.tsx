import { memo } from "react";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { useControls } from "../useControls";

interface SelectControlProps {
  keyId: string;
  label: string;
  options: { label: string; value: string }[];
}

const SelectControl = memo(({ keyId, label, options }: SelectControlProps) => {
  const { values, handleSelectChange } = useControls();
  const value = values[keyId] as string;

  return (
    <div className="flex flex-col gap-sm py-1">
      <Label htmlFor={keyId}>{label}</Label>
      <Select
        value={value}
        onValueChange={(val) => handleSelectChange(keyId, val)}
      >
        <SelectTrigger id={keyId}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

export default SelectControl;
