export type ButtonVariant =
  | "number"
  | "operator"
  | "scientific"
  | "action"
  | "equals"
  | "backspace"

export type CalculatorButton = {
  label: string
  variant: ButtonVariant
  size?: "normal" | "wide" | "extraWide"
}