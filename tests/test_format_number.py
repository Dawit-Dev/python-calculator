from calculator import format_number

def test_format_number():
    assert format_number(5.0) == 5
    assert format_number(5.5) == 5.5