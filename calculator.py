from operations import add, subtract, multiply, divide
history = []

def get_numbers():
    try:
        number1 = float(input("Enter first number: "))
        number2 = float(input("Enter second number: "))
        return number1, number2
    
    except ValueError:
        print("Please enter valid numbers")
        return None

def show_menu():
        print("===== Python Calculator =====")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. View History")
        print("6. Clear History")
        print("7. Exit")

def show_history(history):
    print("===== Calculation History =====")

    if len(history) == 0:
        print("No calculations yet.")
    else:
        for item in history:
            print(item)

def clear_history(history):
    history.clear()
    print("History cleared.")

while True:
        show_menu()


        choice = input("Choose an operation (1-7): ")

        if choice not in ["1", "2", "3", "4", "5", "6", "7"]:
            print("Please choose a number between 1 and 7")
            continue

        elif choice == "5":
            show_history(history)
            continue

        elif choice == "6":
            clear_history(history)
            continue

        elif choice == "7":
            print("Thank you for using the calculator!")
            break

        numbers = get_numbers()

        if numbers is None:
            continue

        number1, number2 = numbers

        if choice == "1":
            symbol = "+"
            result = add(number1, number2)

        elif choice == "2":
            symbol = "-"
            result = subtract(number1, number2)

        elif choice == "3":
            symbol = "*"
            result = multiply(number1, number2)

        elif choice == "4":
            symbol = "/"
            result = divide(number1, number2)

        else:
            print("Invalid choice")
            continue

        print("Result:", result)
        history.append(f"{number1} {symbol} {number2} = {result}")
