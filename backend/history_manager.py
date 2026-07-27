import json

def save_history(history, filename="history.json"):
    with open(filename, "w") as file:
        json.dump(history, file)

def load_history(filename="history.json"):
    try: 
        with open(filename, "r") as file:
            return json.load(file)
        
    except FileNotFoundError:
        return []