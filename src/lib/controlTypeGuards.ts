import { ColourControl, Control, SliderControl, ToggleControl } from "./types";

export const isSliderControl = (control: Control): control is SliderControl =>
  control.type === "slider";

export const isToggleControl = (control: Control): control is ToggleControl =>
  control.type === "toggle";

export const isColourControl = (control: Control): control is ColourControl =>
  control.type === "colour";
