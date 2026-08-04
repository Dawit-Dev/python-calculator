export type ButtonVariant =
  | "number"
  | "operator"
  | "action"
  | "equals"
  | "backspace"

export type CalculatorButton = {
  label: string
  variant: ButtonVariant
}