from operations import add, subtract, multiply, divide
from history_manager import save_history, load_history
from utils import format_number, get_timestamp
history = load_history()

def show_menu():
        print("===== Python Calculator =====")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. View History")
        print("6. Clear History")
        print("7. Exit")

def get_choice():
    while True:
        choice = input("Choose an operation (1-7): ")

        if choice in ["1", "2", "3", "4", "5", "6", "7"]:
            return choice
        
        print("Invalid choice. Please enter a number between 1 and 7.")
def get_numbers():
    while True:
        try:
            number1 = float(input("Enter first number: "))
            number2 = float(input("Enter second number: "))
            return number1, number2
        
        except ValueError:
            print("Please enter valid numbers. Try again.")
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

def main():
    while True:
            show_menu()


            choice = get_choice()

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

            number1 =format_number(number1)
            number2 =format_number(number2)
            result =format_number(result)

            print("Result:", result)

            timestamp = get_timestamp()

            history.append(
                f"{timestamp} | {number1} {symbol} {number2} = {result}"
                )
            save_history(history)

if __name__ == "__main__":
    main()