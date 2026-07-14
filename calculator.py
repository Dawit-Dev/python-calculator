def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    
    return a / b

print("===== Python Calculator =====")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")

choice = input("Choose an operation (1-4): ")

try:
    number1 = float(input("Enter first number: "))
    number2 = float(input("Enter second number: "))

except ValueError:
    print("Please enter valid numbers")
    exit()

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
    exit()

print("Result:", result)