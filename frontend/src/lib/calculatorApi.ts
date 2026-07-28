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