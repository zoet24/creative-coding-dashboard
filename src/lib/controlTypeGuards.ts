import {
  ColourControl,
  Control,
  SelectControl,
  SliderControl,
  TextAreaControl,
  ToggleControl,
} from "./types";

export const isSliderControl = (control: Control): control is SliderControl =>
  control.type === "slider";

export const isToggleControl = (control: Control): control is ToggleControl =>
  control.type === "toggle";

export const isColourControl = (control: Control): control is ColourControl =>
  control.type === "colour";

export const isSelectControl = (control: Control): control is SelectControl =>
  control.type === "select";

export const isTextAreaInputControl = (
  control: Control
): control is TextAreaControl => control.type === "textarea";
