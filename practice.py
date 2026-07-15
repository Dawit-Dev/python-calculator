while True:
    name = input("What is your name? ")

    print(f"Hello, {name}!")

    answer = input("Continue? (y/n): ")

    if answer == "n":
        break
