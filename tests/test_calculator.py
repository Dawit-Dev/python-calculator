from calculator import get_numbers

def test_get_numbers_valid_input(monkeypatch):
    inputs = iter(["3", "5"])

    monkeypatch.setattr("builtins.input", lambda _: next(inputs))

    result = get_numbers()

    assert result == (3.0, 5.0)

def test_get_numbers_invalid_then_valid_input(monkeypatch):
    inputs = iter(["abc", "3", "5"])

    monkeypatch.setattr("builtins.input", lambda _: next(inputs))

    result = get_numbers()

    assert result == (3.0, 5.0)