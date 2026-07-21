# Python Calculator

A simple command-line calculator built with Python.  
The project demonstrates modular programming, file handling, error handling, and automated testing using pytest.

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
- Save calculation history using JSON
- Clear calculation history
- Clean number formatting
- Automated tests using pytest

## Technologies

- Python 3
- Pytest
- JSON
- Git
- GitHub
- VS Code

## How to Run

Clone the repository and run:

```bash
python3 calculator.py
```

## Running Tests

Run the test suite with:

```bash
pytest
```

Current tests cover:

- Calculator operations
- History saving and loading
- Missing history files
- Number formatting
- User input validation
- Edge cases

## Project Structure

```text
python-calculator/
│
├── calculator.py
├── operations.py
├── history_manager.py
├── utils.py
│
├── tests/
│   ├── test_calculator.py
│   ├── test_operations.py
│   ├── test_history_manager.py
│   └── test_utils.py
│
├── README.md
└── .gitignore
```

## Author

Dawit Abraha