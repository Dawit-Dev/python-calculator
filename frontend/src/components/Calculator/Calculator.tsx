"use client"

import { useEffect, useState } from "react"
import Display from "./Display"
import ButtonGrid from "./ButtonGrid"
import { calculate, getHistory, clearHistory } from "@/lib/calculatorApi"
import History from "./History"
import type { HistoryItem } from "@/types/calculator"
import ModeSelector from "./ModeSelector"
import ThemeToggle from "./ThemeToggle"
import { standardButtons } from "@/config/standardButtons"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [expression, setExpression] = useState("")
  const [newCalculation, setNewCalculation] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [liveResult, setLiveResult] = useState("")
  const [mode, setMode] = useState("standard")

  const loadHistory = async () => {
    try {
      const data: HistoryItem[] = await getHistory()
      setHistory(data)
    } catch (error) {
      console.error("Failed to load history", error)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const handleNumber = (number: string) => {
    if (number === ".") {
      if (display.includes(".")) {
        return
      }

      if (display === "0") {
        setDisplay("0.")
        setExpression(expression + "0.")
        return
      }
    }

    if (newCalculation) {
      setDisplay(number)
      setExpression(number)
      setNewCalculation(false)
    } else {
      const newValue = display === "0" ? number : display + number

      setDisplay(newValue)
      setExpression(expression + number)

      updateLiveResult(newValue)
    }
  }

 const handleOperation = (op: string) => {
   if (!display || display === "Error") {
     return
   }

   // Prevent multiple operators in a row
   if (operation) {
     setOperation(op)

     setExpression(expression.replace(/\s[+\-*/]\s*$/, ` ${op} `))

     return
   }

   setPreviousValue(display)
   setOperation(op)
   setExpression(expression + " " + op + " ")
   setDisplay("0")
 }
  
  const updateLiveResult = (currentValue: string) => {
    if (!previousValue || !operation) {
      setLiveResult("")
      return
    }

    const first = Number(previousValue)
    const second = Number(currentValue)

    let result = 0

    switch (operation) {
      case "+":
        result = first + second
        break
      case "-":
        result = first - second
        break
      case "*":
        result = first * second
        break
      case "/":
        if (second === 0) {
          setLiveResult("Error")
          return
        }
        result = first / second
        break
    }

    setLiveResult(String(result))
  }

  const handleCalculate = async () => {
      if (!previousValue || !operation || display === "0") {
        return
      }

    try {
      const data = await calculate(
        Number(previousValue),
        operation,
        Number(display)
      )

      setExpression(expression + " =")
      setDisplay(String(data.result))
      setPreviousValue("")
      setOperation("")
      setNewCalculation(true)

      await loadHistory()
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleClearHistory = async () => {
    try {
      await clearHistory()
      
      setHistory([])
      setDisplay("0")
      setExpression("")
      setPreviousValue("")
      setNewCalculation(false)
    } catch (error) {
      console.error("Failed to clear history", error)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue("")
    setOperation("")
    setExpression("")
  }

  const handleBackspace = () => {
    const newDisplay = display.slice(0, -1)

    setDisplay(newDisplay || "0")

    if (expression.length > 0) {
      setExpression(expression.slice(0, -1))
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-200 p-6'>
      <div className='w-full max-w-sm'>
        <h1 className='mb-6 text-center text-2xl font-bold text-zinc-900'>
          CalcFlow
        </h1>
        <p className='mb-6 text-center text-sm tracking-wide text-zinc-600'>
          Simple . Fast . Accurate
        </p>
        <div className='mb-6 rounded-2xl bg-gradient-to-b from-zinc-800 to-black p-6 text-right shadow-2xl'>
          <div className='mb-6 flex items-center justify-between'>
            <ModeSelector mode={mode} onChange={setMode} />

            <ThemeToggle />
          </div>
          <Display expression={expression} display={liveResult || display} />

          <ButtonGrid
            buttons={standardButtons}
            onButtonClick={(button) => {
              if (button === "C") {
                clear()
              } else if (button === "⌫") {
                handleBackspace()
              } else if (button === "=") {
                handleCalculate()
              } else if (["+", "-", "*", "/"].includes(button)) {
                handleOperation(button)
              } else {
                handleNumber(button)
              }
            }}
          />

          <History history={history} onClearHistory={handleClearHistory} />
        </div>
      </div>
    </main>
  )
}
