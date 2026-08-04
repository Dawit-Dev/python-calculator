import type { CalculatorButton } from "@/types/button"

export const programmerButtons: CalculatorButton[] = [
  { label: "HEX", variant: "action" },
  { label: "DEC", variant: "action" },
  { label: "OCT", variant: "action" },
  { label: "BIN", variant: "action" },

  { label: "AND", variant: "operator" },
  { label: "OR", variant: "operator" },
  { label: "XOR", variant: "operator" },
  { label: "NOT", variant: "operator" },

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
  { label: "=", variant: "equals" },
  { label: "+", variant: "operator" },
]