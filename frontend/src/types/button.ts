export type ButtonVariant =
  | "number"
  | "operator"
  | "action"
  | "equals"

export type CalculatorButton = {
  label: string
  variant: ButtonVariant
}