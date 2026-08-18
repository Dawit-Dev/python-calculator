import type { CalculatorButton } from "@/types/button"

export const scientificButtons: CalculatorButton[] = [
  { label: "sin", variant: "scientific" },
  { label: "cos", variant: "scientific" },
  { label: "tan", variant: "scientific" },
  { label: "√", variant: "scientific" },

  { label: "ln", variant: "scientific" },
  { label: "log", variant: "scientific" },
  { label: "x²", variant: "scientific" },
  { label: "1/x", variant: "scientific" },

  { label: "π", variant: "scientific" },
  { label: "e", variant: "scientific" },
  { label: "^", variant: "scientific" },
  { label: "!", variant: "scientific" },

  { label: "(", variant: "scientific" },
  { label: ")", variant: "scientific" },
  { label: "%", variant: "scientific" },
  { label: "C", variant: "action" },

  { label: "7", variant: "number" },
  { label: "8", variant: "number" },
  { label: "9", variant: "number" },
  { label: "+", variant: "operator" },

  { label: "4", variant: "number" },
  { label: "5", variant: "number" },
  { label: "6", variant: "number" },
  { label: "-", variant: "operator" },

  { label: "1", variant: "number" },
  { label: "2", variant: "number" },
  { label: "3", variant: "number" },
  { label: "*", variant: "operator" },

  { label: "⌫", variant: "backspace" },
  { label: "0", variant: "number" },
  { label: ".", variant: "number" },
  { label: "/", variant: "operator" },

  { label: "=", variant: "equals", size: "extraWide" },
]
