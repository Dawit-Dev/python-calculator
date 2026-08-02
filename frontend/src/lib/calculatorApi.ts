import { error } from "console"

const API_URL = "http://127.0.0.1:8000"

export async function calculate(
    first: number,
    operation: string,
    second: number
) {
    const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first,
            operation,
            second,
        }),
    })

    if (!response.ok) {
        throw new Error("Calculation failed")
    }

    return response.json()
}

export async function getHistory() {
    const response = await fetch(`${API_URL}/history`)

    if (!response.ok) {
        throw new Error("Failed to fetch history")
    }
    return response.json()
}

export async function clearHistory() {
    const response = await fetch(`${API_URL}/history`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to clear history")
    }

    return response.json()
}