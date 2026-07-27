from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from backend.operations import add, subtract, multiply, divide

app = FastAPI()

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
        result = "Invalid operation"

    return {
        "result": result
    }