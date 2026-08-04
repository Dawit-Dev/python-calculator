import type { CalculatorButton } from "@/types/button"

export const scientificButtons: CalculatorButton[] = [
  { label: "sin", variant: "operator" },
  { label: "cos", variant: "operator" },
  { label: "tan", variant: "operator" },
  { label: "√", variant: "operator" },

  { label: "π", variant: "number" },
  { label: "^", variant: "operator" },
  { label: "(", variant: "operator" },
  { label: ")", variant: "operator" },

  { label: "7", variant: "number" },
  { label: "8", variant: "number" },
  { label: "9", variant: "number" },
  { label: "/", variant: "operator" },

  { label: "4", variant: "number" },
  { label: "5", variant: "number" },
  { label: "6", variant: "number" },
  { label: "*", variant: "operator" },

  { label: "1", variant: "number" },
  { label: "2", variant: "number" },
  { label: "3", variant: "number" },
  { label: "-", variant: "operator" },

  { label: "C", variant: "action" },
  { label: "0", variant: "number" },
  { label: ".", variant: "number" },
  { label: "=", variant: "equals" },
]