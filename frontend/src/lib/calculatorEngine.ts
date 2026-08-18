type Operator = "+" | "-" | "*" | "/" | "^"

type FunctionName = "sin" | "cos" | "tan" | "sqrt" | "ln" | "log"

type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: Operator }
  | { type: "leftParen" }
  | { type: "rightParen" }
  | { type: "function"; value: FunctionName }
  | { type: "constant"; value: "π" | "e" }
  | { type: "factorial" }
  | { type: "percent" }

const precedence: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3,
}

const isDigit = (value: string) => /[0-9]/.test(value)

const isLetter = (value: string) => /[a-zA-Z]/.test(value)

const cleanResult = (value: number): number => {
  if (Math.abs(value) < 1e-12) {
    return 0
  }

  return Number(value.toPrecision(12))
}

const applyOperation = (
  first: number,
  operator: Operator,
  second: number
): number => {
  switch (operator) {
    case "+":
      return first + second

    case "-":
      return first - second

    case "*":
      return first * second

    case "/":
      if (second === 0) {
        throw new Error("Cannot divide by zero")
      }

      return first / second

    case "^":
      return Math.pow(first, second)
  }
}

const applyFunction = (name: FunctionName, value: number): number => {
  switch (name) {
    case "sin":
      return Math.sin((value * Math.PI) / 180)

    case "cos":
      return Math.cos((value * Math.PI) / 180)

    case "tan":
      return Math.tan((value * Math.PI) / 180)

    case "sqrt":
      if (value < 0) {
        throw new Error("Cannot calculate square root of a negative number")
      }

      return Math.sqrt(value)

    case "ln":
      if (value <= 0) {
        throw new Error("Natural logarithm requires a positive number")
      }

      return Math.log(value)

    case "log":
      if (value <= 0) {
        throw new Error("Logarithm requires a positive number")
      }

      return Math.log10(value)
  }
}

const calculateFactorial = (value: number): number => {
  if (!Number.isInteger(value)) {
    throw new Error("Factorial requires a whole number")
  }

  if (value < 0) {
    throw new Error("Factorial cannot be negative")
  }

  let result = 1

  for (let number = 2; number <= value; number++) {
    result *= number
  }

  return result
}

const tokenize = (expression: string): Token[] => {
  const tokens: Token[] = []

  let i = 0

  while (i < expression.length) {
    const char = expression[i]

    // Ignore spaces
    if (/\s/.test(char)) {
      i++
      continue
    }

    // Numbers, including decimals
    if (isDigit(char) || char === ".") {
      let number = char
      i++

      while (
        i < expression.length &&
        (isDigit(expression[i]) || expression[i] === ".")
      ) {
        number += expression[i]
        i++
      }

      const value = Number(number)

      if (Number.isNaN(value)) {
        throw new Error("Invalid number")
      }

      tokens.push({
        type: "number",
        value,
      })

      continue
    }

    // Constants
    if (char === "π" || char === "e") {
      tokens.push({
        type: "constant",
        value: char,
      })

      i++
      continue
    }

    // Scientific functions
    if (isLetter(char)) {
      let name = char
      i++

      while (i < expression.length && isLetter(expression[i])) {
        name += expression[i]
        i++
      }

      if (
        name !== "sin" &&
        name !== "cos" &&
        name !== "tan" &&
        name !== "sqrt" &&
        name !== "ln" &&
        name !== "log"
      ) {
        throw new Error(`Unknown function: ${name}`)
      }

      tokens.push({
        type: "function",
        value: name,
      })

      continue
    }

    // Constants
    if (char === "π" || char === "e") {
      tokens.push({
        type: "constant",
        value: char,
      })

      i++
      continue
    }

    // Factorial
    if (char === "!") {
      tokens.push({
        type: "factorial",
      })

      i++
      continue
    }

    // Percentage
    if (char === "%") {
      tokens.push({
        type: "percent",
      })

      i++
      continue
    }

    // Operators
    if (
      char === "+" ||
      char === "-" ||
      char === "*" ||
      char === "/" ||
      char === "^"
    ) {
      tokens.push({
        type: "operator",
        value: char,
      })

      i++
      continue
    }

    // Parentheses
    if (char === "(") {
      tokens.push({
        type: "leftParen",
      })

      i++
      continue
    }

    if (char === ")") {
      tokens.push({
        type: "rightParen",
      })

      i++
      continue
    }

    throw new Error(`Invalid character: ${char}`)
  }

  return tokens
}

export const evaluateExpression = (expression: string): number => {
  const tokens = tokenize(expression)

  let position = 0

  const parseExpression = (): number => {
    let result = parseTerm()

    while (position < tokens.length) {
      const token = tokens[position]

      if (
        token.type !== "operator" ||
        (token.value !== "+" && token.value !== "-")
      ) {
        break
      }

      position++

      const right = parseTerm()

      result = applyOperation(result, token.value, right)
    }

    return result
  }

  const parseTerm = (): number => {
    let result = parsePower()

    while (position < tokens.length) {
      const token = tokens[position]

      if (
        token.type !== "operator" ||
        (token.value !== "*" && token.value !== "/")
      ) {
        break
      }

      position++

      const right = parsePower()

      result = applyOperation(result, token.value, right)
    }

    return result
  }

  const parsePower = (): number => {
    let result = parseUnary()

    const token = tokens[position]

    if (token && token.type === "operator" && token.value === "^") {
      position++

      const right = parsePower()

      result = applyOperation(result, "^", right)
    }

    return result
  }

  const parseUnary = (): number => {
    if (position >= tokens.length) {
      throw new Error("Invalid expression")
    }

    const token = tokens[position]

    // Negative number / unary minus
    if (token.type === "operator" && token.value === "-") {
      position++
      return -parseUnary()
    }

    // Positive number / unary plus
    if (token.type === "operator" && token.value === "+") {
      position++
      return parseUnary()
    }

    let result: number

    // Number
    if (token.type === "number") {
      position++
      result = token.value
    }

    // Constants
    else if (token.type === "constant") {
      position++

      result = token.value === "π" ? Math.PI : Math.E
    }

    // Parentheses
    else if (token.type === "leftParen") {
      position++

      result = parseExpression()

      if (position >= tokens.length || tokens[position].type !== "rightParen") {
        throw new Error("Missing closing parenthesis")
      }

      position++
    }

    // Scientific functions
    else if (token.type === "function") {
      position++

      if (position >= tokens.length || tokens[position].type !== "leftParen") {
        throw new Error(`Expected '(' after ${token.value}`)
      }

      position++

      const value = parseExpression()

      if (position >= tokens.length || tokens[position].type !== "rightParen") {
        throw new Error(`Missing ')' after ${token.value}`)
      }

      position++

      result = applyFunction(token.value, value)
    } else {
      throw new Error("Invalid expression")
    }

    // Postfix operations: factorial and percentage
    while (position < tokens.length) {
      const postfixToken = tokens[position]

      if (postfixToken.type === "factorial") {
        position++
        result = calculateFactorial(result)
        continue
      }

      if (postfixToken.type === "percent") {
        position++
        result = result / 100
        continue
      }

      break
    }

    return result
  }

  const result = parseExpression()

  if (position !== tokens.length) {
    throw new Error("Invalid expression")
  }

  if (!Number.isFinite(result)) {
    throw new Error("Invalid result")
  }

  return cleanResult(result)
}
