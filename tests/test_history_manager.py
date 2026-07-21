from history_manager import save_history, load_history

def  test_save_and_load_history(tmp_path):
    history_file = tmp_path / "history.json"
    history = ["3 + 3 = 6"]

    save_history(history, history_file)

    result = load_history(history_file)

    assert result == history

def test_load_history_file_not_found(tmp_path):
    history_file = tmp_path / "missing_history.json"

    result = load_history(history_file)

    assert result == []

def test_save_multiple_history_items(tmp_path):
    history_fle = tmp_path / "history.json"

    history = [
        "3 + 3 = 6",
        "5 / 2 = 2.5"
    ]
    save_history(history, history_fle)

    result = load_history(history_fle)

    assert result == history