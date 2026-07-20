# Python Calculator

A simple command-line calculator built with Python.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Input validation
- Division by zero protection
- Continuous calculator loop
- Perform multiple calculations without restarting the program
- View calculation history
- Clear calculation history
- Exit option
- Automated tests using pytest

## Technologies

- Python 3
- Pytest
- Git
- GitHub
- VS Code

## Project Structure


python-calculator/
│
├── calculator.py # Main calculator application
├── operations.py # Calculator operation functions
├── tests/
│ ├── conftest.py # Test configuration
│ └── test_operations.py # Automated tests
├── practice.py # Python practice exercises
├── README.md
└── .gitignore


## How to Run

Clone the repository:

```bash
git clone https://github.com/Dawit-Dev/python-calculator.git

Navigate into the project folder:

cd python-calculator

Create and activate a virtual environment:

python3 -m venv .venv

source .venv/bin/activate

Install dependencies:

pip install pytest

Run the calculator:

python3 calculator.py
Example Usage
===== Python Calculator =====
1. Add
2. Subtract
3. Multiply
4. Divide
5. View History
6. Clear History
7. Exit

Choose an operation (1-7): 1

Enter first number: 5
Enter second number: 3

Result: 8.0
Running Tests

Run the automated tests:

pytest

Expected result:

5 passed

The tests currently cover:

Addition
Subtraction
Multiplication
Division
Division by zero protection
Future Improvements
Build a responsive web version
Make the calculator accessible on mobile devices
Add a graphical user interface (GUI)
Add scientific calculator features
Save calculation history permanently
Improve user experience and design
Author

Dawit Abraha