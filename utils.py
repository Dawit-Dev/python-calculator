from datetime import datetime

def get_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def format_number(number):
    if number.is_integer():
        return int(number)
    
    return number