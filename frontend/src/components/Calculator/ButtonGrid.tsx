import Button from "./Button"

type ButtonGridProps = {
  onButtonClick: (button: string) => void
  getButtonStyle: (button: string) => string
}

export default function ButtonGrid({
  onButtonClick,
  getButtonStyle,
}: ButtonGridProps) {
  const buttons = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "C",
    "0",
    "=",
    "/",
  ]

  return (
    <div className='grid grid-cols-4 gap-3'>
      {buttons.map((button) => (
        <Button
          key={button}
          label={button}
          onClick={() => onButtonClick(button)}
          className={getButtonStyle(button)}
        />
      ))}
    </div>
  )
}
