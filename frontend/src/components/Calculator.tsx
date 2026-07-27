"use client"
import { useState } from "react"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [expression, setExpression] = useState("")
  const [newCalculation, setNewCalculation] = useState(false)

  const handleNumber = (number: string) => {
    if (newCalculation) {
      setDisplay(number)
      setExpression(number)
      setNewCalculation(false)
    } else {
      setDisplay(display === "0" ? number : display + number)
      setExpression(expression + number)
    }
  }

  const handleOperation = (op: string) => {
    setPreviousValue(display)
    setOperation(op)
    setExpression(expression + " " + op + " ")
    setDisplay("0")
  }

  const calculate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first: Number(previousValue),
          operation: operation,
          second: Number(display),
        }),
      })

      const data = await response.json()

      setExpression(expression + " =")
      setDisplay(String(data.result))
      setPreviousValue("")
      setOperation("")
      setNewCalculation(true)
    } catch (error) {
      setDisplay("Error")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue("")
    setOperation("")
    setExpression("")
  }

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

  const getButtonStyle = (button: string) => {
    if (button === "=") {
      return "bg-blue-500 text-white hover:bg-blue-600"
    }

    if (button === "C") {
      return "bg-red-500 text-white hover:bg-red-600"
    }

    if (["+", "-", "*", "/"].includes(button)) {
      return "bg-orange-500 text-white hover:bg-orange-600"
    }

    return "bg-zinc-200 text-black hover:bg-zinc-300"
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-200 p-6'>
      <div className='w-full max-w-sm'>
        <h1 className='mb-6 text-center text-2xl font-bold text-zinc-900'>
          Dawit's Calculator
        </h1>
        <div className='mb-6 rounded-xl bg-zinc-900 p-5 text-right'>
          <div className='min-h-8 text-lg font-medium text-zinc-400'>
            {expression}
          </div>

          <div className='mb-3 text-5xl font-bold text-white'>{display}</div>

          <div className='grid grid-cols-4 gap-3'>
            {buttons.map((button) => (
              <button
                key={button}
                onClick={() => {
                  if (button === "C") clear()
                  else if (button === "=") calculate()
                  else if (["+", "-", "*", "/"].includes(button))
                    handleOperation(button)
                  else handleNumber(button)
                }}
                className={`rounded-xl p-4 text-xl font-semibold transition-all duration-150 ${getButtonStyle(
                  button
                )}`}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
