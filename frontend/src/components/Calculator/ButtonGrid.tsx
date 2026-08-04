import Button from "./Button"
import type { CalculatorButton } from "@/types/button"

type ButtonGridProps = {
  buttons: CalculatorButton[]
  onButtonClick: (button: string) => void
}

export default function ButtonGrid({
  buttons,
  onButtonClick,
}: ButtonGridProps) {
  return (
    <div className='grid grid-cols-4 gap-3'>
      {buttons.map((button) => (
        <Button
          key={button.label}
          label={button.label}
          variant={button.variant}
          size={button.size}
          onClick={() => onButtonClick(button.label)}
        />
      ))}
    </div>
  )
}
