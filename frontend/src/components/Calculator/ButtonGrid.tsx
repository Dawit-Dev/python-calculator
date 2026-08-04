import Button from "./Button"
import type { CalculatorButton } from "@/types/button"

type ButtonGridProps = {
  onButtonClick: (button: string) => void
}

export default function ButtonGrid({ onButtonClick }: ButtonGridProps) {
  const buttons: CalculatorButton[] = [
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

    { label: "C", variant: "action" },
    { label: "0", variant: "number" },
    { label: ".", variant: "number" },
    { label: "⌫", variant: "backspace" },
    
    { label: "=", variant: "equals" },
    { label: "/", variant: "operator" },
  ]

  return (
    <div className='grid grid-cols-4 gap-3'>
      {buttons.map((button) => (
        <Button
          key={button.label}
          label={button.label}
          variant={button.variant}
          onClick={() => onButtonClick(button.label)}
        />
      ))}
    </div>
  )
}
