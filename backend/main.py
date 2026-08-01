from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from backend.operations import add, subtract, multiply, divide
from backend.history_manager import save_history, load_history

app = FastAPI()
history = load_history()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
class CalculationRequest(BaseModel):
    first: float
    operation: str
    second: float

@app.get("/")
def home():
    return {"message": "Python Calculator API is running!"}

@app.post("/calculate")
def calculate(request: CalculationRequest):

    if request.operation == "+":
        result = add(request.first, request.second)

    elif request.operation == "-":
        result = subtract(request.first, request.second)

    elif request.operation == "*":
        result = multiply(request.first, request.second)

    elif request.operation == "/":
        result = divide(request.first, request.second)

    else:
        return {
            "error": "Invalid operation"
        }

    calculation = {
        "first": request.first,
        "operation": request.operation,
        "second": request.second,
        "result": result,
    }

    history.append(calculation)

    save_history(history)

    return {
        "result": result
    }

@app.get("/history", response_model=List[Dict[str, Any]])
def get_history():
    return history