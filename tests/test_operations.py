from operations import add, subtract, multiply, divide

def test_add():
    result = add(3, 5)

    assert result == 8

def test_subtract():
    result = subtract(10, 4)

    assert result == 6

def test_multiply():
    result = multiply(3, 5)

    assert result == 15

def test_divide():
    result = divide(10, 2)

    assert result == 5

def test_divide_by_zero():
    result = divide(10, 0)

    assert result == "Cannot divide by zero"