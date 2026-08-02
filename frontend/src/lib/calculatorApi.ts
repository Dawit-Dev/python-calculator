import type { HistoryItem } from "@/types/calculator"
import { ApiError } from "next/dist/server/api-utils"

type HistoryResponse = HistoryItem[]

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
    throw new Error("API URL is missing")
}

type CalculationResponse = {
    result: number
}

export async function calculate(
    first: number,
    operation: string,
    second: number
): Promise<CalculationResponse> {
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

export async function getHistory(): Promise<HistoryResponse> {
    const response = await fetch(`${API_URL}/history`)

    if (!response.ok) {
        throw new Error("Failed to fetch history")
    }
    return response.json()
}

export async function clearHistory(): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/history`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error("Failed to clear history")
    }

    return response.json()
}