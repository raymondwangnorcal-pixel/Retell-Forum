import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SearchUiParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assist_query = {}
        self.composer_notes = []
        self._inside_composer_note = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        classes = set(attributes.get("class", "").split())

        if tag == "textarea" and attributes.get("id") == "assist-query":
            self.assist_query = attributes
        if "composer-note" in classes:
            self._inside_composer_note = True

    def handle_endtag(self, tag):
        if tag == "p" and self._inside_composer_note:
            self._inside_composer_note = False

    def handle_data(self, data):
        if self._inside_composer_note and data.strip():
            self.composer_notes.append(data.strip())


class SearchUiTests(unittest.TestCase):
    def test_search_field_uses_only_live_suggestion_help(self):
        parser = SearchUiParser()
        parser.feed((ROOT / "index.html").read_text())

        self.assertEqual([], parser.composer_notes)
        self.assertEqual(
            "assist-suggestion-status",
            parser.assist_query.get("aria-describedby"),
        )

    def test_suggestion_panel_uses_the_same_thin_border_on_every_edge(self):
        stylesheet = (ROOT / "styles.css").read_text()
        rule = re.search(r"\.search-suggestions\s*\{([^}]*)\}", stylesheet)

        self.assertIsNotNone(rule)
        declarations = rule.group(1)
        self.assertIn("border: 1px solid #52648f;", declarations)
        self.assertNotIn("border-top:", declarations)


if __name__ == "__main__":
    unittest.main()
