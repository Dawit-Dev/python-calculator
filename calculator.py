from operations import add, subtract, multiply, divide
history = []

while True:
    print("===== Python Calculator =====")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. View History")

    choice = input("Choose an operation (1-5): ")

    if choice not in ["1", "2", "3", "4", "5"]:
        print("Please choose a number between 1 and 5")
        continue

    elif choice == "5":
        print("===== Calculation History =====")

        if len(history) == 0:
            print("No calculations yet.")

        else:
            for item in history:
                print(item)
        continue 

    try:
        number1 = float(input("Enter first number: "))
        number2 = float(input("Enter second number: "))

    except ValueError:
        print("Please enter a valid numbers")
        continue

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

    again = input("Do another calculation? (y/n): ")

    if again.lower() != "y":
        print("Thank you for using the calculator!")
        break
