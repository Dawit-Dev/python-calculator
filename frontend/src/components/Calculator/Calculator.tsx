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
import { scientificButtons } from "@/config/scientificButtons"
import { programmerButtons } from "@/config/programmerButtons"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [expression, setExpression] = useState("")
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

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  const handleBackspace = () => {
    const newDisplay = display.slice(0, -1)

    setDisplay(newDisplay || "0")

    if (expression.length > 0) {
      setExpression(expression.slice(0, -1))
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
