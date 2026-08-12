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

  const updateLiveResult = (currentExpression: string) => {
    try {
      if (!currentExpression.trim()) {
        setLiveResult("")
        return
      }

      // Don't try to evaluate an expression that ends with an operator.
      const previewExpression = currentExpression.replace(/\s[+\-*/^]\s*$/, "")

      if (!previewExpression.trim()) {
        setLiveResult("")
        return
      }

      const result = evaluateExpression(previewExpression)

      setLiveResult(String(result))
    } catch {
      // An incomplete expression is normal while typing.
      setLiveResult("")
    }
  }

  const appendExpression = (value: string, newDisplay?: string) => {
    let baseExpression = calculationExpression

    if (newCalculation) {
      baseExpression = ""
      setNewCalculation(false)
    }

    const updatedExpression = baseExpression + value

    setCalculationExpression(updatedExpression)
    setExpression(updatedExpression)

    if (newDisplay !== undefined) {
      setDisplay(newDisplay)
    }

    updateLiveResult(updatedExpression)
  }

  const handleNumber = (number: string) => {
    if (number === ".") {
      // Prevent multiple decimal points in the current number.
      const currentNumber =
        calculationExpression.split(/[\s+\-*/^()]+/).pop() || ""

      if (currentNumber.includes(".")) {
        return
      }

      if (currentNumber === "") {
        appendExpression("0.", "0.")
        return
      }
    }

    if (newCalculation) {
      setDisplay(number)
      setExpression(number)
      setCalculationExpression(number)
      setLiveResult("")
      setNewCalculation(false)
      return
    }

    const newDisplay = display === "0" || liveResult ? number : display + number

    const updatedExpression = calculationExpression + number

    setDisplay(newDisplay)
    setExpression(updatedExpression)
    setCalculationExpression(updatedExpression)

    updateLiveResult(updatedExpression)
  }

  const handleOperation = (op: string) => {
    if (!display || display === "Error") {
      return
    }

    if (newCalculation) {
      const updatedExpression = display + " " + op + " "

      setCalculationExpression(updatedExpression)
      setExpression(updatedExpression)
      setDisplay("0")
      setLiveResult("")
      setNewCalculation(false)

      return
    }

    // Prevent adding two operators in a row.
    if (/[+\-*/^]\s*$/.test(calculationExpression)) {
      return
    }

    const updatedExpression = calculationExpression + " " + op + " "

    setCalculationExpression(updatedExpression)
    setExpression(updatedExpression)
    setDisplay("0")

    updateLiveResult(updatedExpression)
  }

  const handleFunction = (functionName: "sin" | "cos" | "tan" | "sqrt") => {
    const displayFunction =
      functionName === "sqrt" ? "sqrt(" : `${functionName}(`

    const baseExpression = newCalculation ? "" : calculationExpression

    const updatedExpression = baseExpression + displayFunction

    setCalculationExpression(updatedExpression)
    setExpression(updatedExpression)
    setDisplay("0")
    setLiveResult("")
    setNewCalculation(false)
  }

  const handleParenthesis = (parenthesis: "(" | ")") => {
    const updatedExpression = calculationExpression + parenthesis

    setCalculationExpression(updatedExpression)
    setExpression(updatedExpression)

    if (parenthesis === "(") {
      setDisplay("0")
    }

    updateLiveResult(updatedExpression)
  }

  const handleConstant = (constant: "π") => {
    const updatedExpression = calculationExpression + constant

    setCalculationExpression(updatedExpression)
    setExpression(updatedExpression)
    setDisplay(constant)

    updateLiveResult(updatedExpression)
  }

  const handleCalculate = async () => {
    if (!calculationExpression.trim()) {
      return
    }

    try {
      const result = evaluateExpression(calculationExpression)

      // Save every expression through the expression-history API.
      await addHistory(calculationExpression, result)

      setExpression(calculationExpression + " =")
      setDisplay(String(result))
      setCalculationExpression(String(result))
      setLiveResult("")
      setNewCalculation(true)

      await loadHistory()
    } catch (error) {
      console.error("Calculation failed:", error)
      setDisplay("Error")
      setLiveResult("")
    }
  }

  const handleClearHistory = async () => {
    try {
      await clearHistory()

      setHistory([])
      setDisplay("0")
      setExpression("")
      setCalculationExpression("")
      setPreviousValue("")
      setOperation("")
      setLiveResult("")
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
    if (newCalculation) {
      clear()
      return
    }

    const newCalculationExpression = calculationExpression.slice(0, -1)

    const newExpression = expression.slice(0, -1)

    setCalculationExpression(newCalculationExpression)

    setExpression(newExpression)

    // Work out what should appear in the main display.
    const lastNumber =
      newCalculationExpression.split(/[\s+\-*/^()]+/).pop() || ""

    setDisplay(lastNumber || "0")

    if (newCalculationExpression) {
      updateLiveResult(newCalculationExpression)
    } else {
      setLiveResult("")
    }
  }

  const handleButtonClick = (button: string) => {
    if (button === "C") {
      clear()
      return
    }

    if (button === "⌫") {
      handleBackspace()
      return
    }

    if (button === "=") {
      handleCalculate()
      return
    }

    if (["+", "-", "*", "/"].includes(button)) {
      handleOperation(button)
      return
    }

    handleNumber(button)
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
                  border
                  border-zinc-600
                  bg-gradient-to-b
                  from-zinc-700
                  to-zinc-900
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
              } else if (["+", "-", "*", "/", "^"].includes(button)) {
                handleOperation(button)
              } else if (["sin", "cos", "tan"].includes(button)) {
                handleFunction(button as "sin" | "cos" | "tan")
              } else if (button === "√") {
                handleFunction("sqrt")
              } else if (button === "(" || button === ")") {
                handleParenthesis(button)
              } else if (button === "π") {
                handleConstant("π")
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
