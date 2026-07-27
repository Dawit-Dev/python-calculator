from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Python Calculator API is running!"}