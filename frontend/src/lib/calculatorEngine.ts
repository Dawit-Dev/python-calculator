type Operator = "+" | "-" | "*" | "/"

const precedence: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
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
  }
}

export const evaluateExpression = (expression: string): number => {
  const tokens = expression.trim().split(/\s+/)

  const values: number[] = []
  const operators: Operator[] = []

  const applyTopOperation = () => {
    const operator = operators.pop()

    if (!operator) {
      return
    }

    const second = values.pop()
    const first = values.pop()

    if (first === undefined || second === undefined) {
      throw new Error("Invalid expression")
    }

    values.push(applyOperation(first, operator, second))
  }

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      values.push(Number(token))
      continue
    }

    const operator = token as Operator

    while (
      operators.length > 0 &&
      precedence[operators[operators.length - 1]] >= precedence[operator]
    ) {
      applyTopOperation()
    }

    operators.push(operator)
  }

  while (operators.length > 0) {
    applyTopOperation()
  }

  if (values.length !== 1) {
    throw new Error("Invalid expression")
  }

  return values[0]
}