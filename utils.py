from datetime import datetime

def get_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def format_number(number):
    if number.is_integer():
        return int(number)
    
    return number

def format_history_entry(timestamp, number1, symbol, number2, result):
    return f"{timestamp} | {number1} {symbol} {number2} = {result}"