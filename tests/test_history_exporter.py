from history_exporter import export_history

def test_export_history(tmp_path):
    history_file = tmp_path / "history.csv"

    history = [
        "2026-07-21 19:01:03 | 3 + 3 = 6"
    ]
    export_history(history, history_file)

    content = history_file.read_text()

    assert "Calculation" in content
    assert "3 + 3 = 6" in content