import { memo } from "react";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { useControls } from "../useControls";

interface TextAreaInputControlProps {
  keyId: string;
  label: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextAreaInputControl = memo(
  ({ keyId, label, onFocus, onBlur }: TextAreaInputControlProps) => {
    const { values, handleTextAreaChange } = useControls();
    const value = values[keyId] as string;

    return (
      <div className="flex flex-col gap-sm">
        <Label htmlFor={keyId}>{label}</Label>
        <Textarea
          id={keyId}
          placeholder="Enter your text here..."
          value={value}
          onChange={(e) => handleTextAreaChange(keyId, e.target.value)}
          rows={4}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default TextAreaInputControl;
