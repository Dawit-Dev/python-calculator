"use client"

import { useEffect, useState } from "react"
import Display from "./Display"
import ButtonGrid from "./ButtonGrid"
import {
  calculate,
  getHistory,
  addHistory,
  clearHistory,
} from "@/lib/calculatorApi"
import History from "./History"
import type { HistoryItem } from "@/types/calculator"
import ModeSelector from "./ModeSelector"
import ThemeToggle from "./ThemeToggle"
import { standardButtons } from "@/config/standardButtons"
import { scientificButtons } from "@/config/scientificButtons"
import { programmerButtons } from "@/config/programmerButtons"
import { evaluateExpression } from "@/lib/calculatorEngine"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [expression, setExpression] = useState("")
  const [calculationExpression, setCalculationExpression] = useState("")
  const [newCalculation, setNewCalculation] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [theme, setTheme] = useState<"light" | "dark">("dark")
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
        const updatedExpression = calculationExpression + "0."

        setDisplay("0.")
        setExpression(expression + "0.")
        setCalculationExpression(updatedExpression)
        return
      }
    }

    if (newCalculation) {
      setDisplay(number)
      setExpression(number)
      setCalculationExpression(number)
      setNewCalculation(false)
    } else {
      const newValue = display === "0" ? number : display + number

      const updatedExpression = calculationExpression + number

      setDisplay(newValue)
      setExpression(expression + number)
      setCalculationExpression(updatedExpression)

      updateLiveResult(updatedExpression)
    }
  }

  const handleOperation = (op: string) => {
    if (!display || display === "Error") {
      return
    }

    const updatedExpression = calculationExpression + " " + op + " "

    setCalculationExpression(updatedExpression)

    setExpression(updatedExpression)

    setDisplay("0")
    updateLiveResult(updatedExpression)
  }

  const updateLiveResult = (currentExpression: string) => {
    try {
      if (!currentExpression) {
        setLiveResult("")
        return
      }

      const previewExpression = currentExpression.replace(/\s[+\-*/]\s*$/, "")

      if (!previewExpression) {
        setLiveResult("")
        return
      }

      const result = evaluateExpression(previewExpression)

      setLiveResult(String(result))
    } catch {
      setLiveResult("")
    }
  }

  const handleCalculate = async () => {
    if (!calculationExpression) {
      return
    }

    try {
      const result = evaluateExpression(calculationExpression)

      const parts = calculationExpression.trim().split(" ")

      if (parts.length === 3) {
        await calculate(Number(parts[0]), parts[1], Number(parts[2]))
      } else { 
        await addHistory(calculationExpression, result)
      }

      setExpression(calculationExpression + " =")
      setDisplay(String(result))
      setCalculationExpression(String(result))
      setLiveResult("")
      setNewCalculation(true)

      await loadHistory()
    } catch (error) {
      console.error("Calculation failed:", error)
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
    setCalculationExpression("")
    setLiveResult("")
    setNewCalculation(false)
  }

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  const handleBackspace = () => {
    const newDisplay = display.slice(0, -1)
    const newExpression = expression.slice(0, -1)
    const newCalculationExpression = calculationExpression.slice(0, -1)

    setDisplay(newDisplay || "0")
    setExpression(newExpression)
    setCalculationExpression(newCalculationExpression)

    if (newCalculationExpression) {
      updateLiveResult(newCalculationExpression)
    } else {
      setLiveResult("")
    }
  }

  const buttons =
    mode === "scientific"
      ? scientificButtons
      : mode === "programmer"
      ? programmerButtons
      : standardButtons

  return (
    <main
      className={`
    flex
    min-h-screen
    items-center
    justify-center
    p-6
    transition-colors
    duration-300
    ${theme === "dark" ? "bg-zinc-950" : "bg-zinc-200"}
  `}
    >
      <div
        className={`w-full max-w-sm transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-zinc-900"
        }`}
      >
        <h1
          className={`mb-6 text-center text-2xl font-bold transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}
        >
          CalcFlow
        </h1>
        <p
          className={`mb-6 text-center text-sm tracking-wide transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          Simple . Fast . Accurate
        </p>

        <div
          className={`
    mb-6
    rounded-2xl
    p-6
    text-right
    shadow-2xl
    transition-colors
    duration-300
    ${
      theme === "dark"
        ? `
      bg-gradient-to-b
      from-zinc-700
      to-zinc-900
      border
      border-zinc-600
      shadow-[0_0_35px_rgba(255,255,255,0.08)]
    `
        : "bg-white shadow-2xl"
    }
  `}
        >
          <div className='mb-6 flex items-center justify-between'>
            <ModeSelector mode={mode} onChange={setMode} />

            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <Display
            expression={expression}
            display={liveResult || display}
            theme={theme}
          />

          <ButtonGrid
            buttons={buttons}
            theme={theme}
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
