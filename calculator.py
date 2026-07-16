from operations import add, subtract, multiply, divide

while True:
    print("===== Python Calculator =====")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")

    choice = input("Choose an operation (1-4): ")

    if choice not in ["1", "2", "3", "4"]:
        print("Please choose a number between 1 and 4")
        continue

    try:
        number1 = float(input("Enter first number: "))
        number2 = float(input("Enter second number: "))

    except ValueError:
        print("Please enter a valid numbers")
        continue

    if choice == "1":
        result = add(number1, number2)

    elif choice == "2":
        result = subtract(number1, number2)

    elif choice == "3":
        result = multiply(number1, number2)

    elif choice == "4":
        result = divide(number1, number2)

    else:
        print("Invalid choice")
        continue

    print("Result:", result)

    again = input("Do another calculation? (y/n): ")

    if again.lower() != "y":
        print("Thank you for using the calculator!")
        break
