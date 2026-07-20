from history_manager import save_history, load_history

def  test_save_and_load_history(tmp_path):
    history_file = tmp_path / "history.json"
    history = ["3 + 3 = 6"]

    save_history(history, history_file)

    result = load_history(history_file)

    assert result == history