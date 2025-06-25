import { memo } from "react";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { useControls } from "../useControls";

interface TextAreaInputControlProps {
  keyId: string;
  label: string;
  placeholder?: string;
}

const TextAreaInputControl = memo(
  ({ keyId, label, placeholder }: TextAreaInputControlProps) => {
    const { values, handleTextAreaChange } = useControls();
    const value = values[keyId] as string;

    return (
      <div className="flex flex-col gap-sm">
        <Label htmlFor={keyId}>{label}</Label>
        <Textarea
          id={keyId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleTextAreaChange(keyId, e.target.value)}
          rows={4}
        />
      </div>
    );
  }
);

export default TextAreaInputControl;
