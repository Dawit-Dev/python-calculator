from utils import format_number, get_timestamp  

def test_get_timestamp():
    result = get_timestamp()

    assert len(result) == 19
    assert result[4] == "-"
    assert result[7] == "-"
def test_format_number():
    assert format_number(5.0) == 5
    assert format_number(5.5) == 5.5