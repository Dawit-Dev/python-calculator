"use client"

import { useEffect, useState } from "react"
import Display from "./Display"
import ButtonGrid from "./ButtonGrid"
import { calculate, getHistory, clearHistory } from "@/lib/calculatorApi"
import History from "./History"
import type { HistoryItem  } from "@/types/calculator"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [expression, setExpression] = useState("")
  const [newCalculation, setNewCalculation] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])

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

  const handleCalculate = async () => {
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

    return "bg-zinc-100 text-zinc-900 hover:bg-white"
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-200 p-6'>
      <div className='w-full max-w-sm'>
        <h1 className='mb-6 text-center text-2xl font-bold text-zinc-900'>
          CalcFlow
        </h1>
        <p className="mb-6 text-center text-sm tracking-wide text-zinc-600">
          Simple . Fast . Accurate
        </p>
        <div className='mb-6 rounded-2xl bg-gradient-to-b from-zinc-800 to-black p-6 text-right shadow-2xl'>
          <Display expression={expression} display={display} />

          <ButtonGrid
            onButtonClick={(button) => {
              if (button === "C") clear()
              else if (button === "=") handleCalculate()
              else if (["+", "-", "*", "/"].includes(button))
                handleOperation(button)
              else handleNumber(button)
            }}
            getButtonStyle={getButtonStyle}
          />

          <History
            history={history}
            onClearHistory={handleClearHistory}
          />
        </div>
      </div>
    </main>
  )
}
