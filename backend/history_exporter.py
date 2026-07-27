import csv

def export_history(history, filename="history.csv"):
    with open(filename, "w", newline="") as file:
        writer = csv.writer(file)

        writer.writerow(["Calculation"])

        for item in history:
            writer.writerow([item])