from utils import format_number, get_timestamp, format_history_entry 

def test_get_timestamp():
    result = get_timestamp()

    assert len(result) == 19
    assert result[4] == "-"
    assert result[7] == "-"
def test_format_number():
    assert format_number(5.0) == 5
    assert format_number(5.5) == 5.5

def test_format_history_entry():
    result = format_history_entry(
        "2026-07-21 19:00:00",
        3,
        "+",
        3,
        6
    )

    assert result == "2026-07-21 19:00:00 | 3 + 3 = 6"