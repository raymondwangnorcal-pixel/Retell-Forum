import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class BrandingParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.brand_buttons = []
        self._current_brand = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        classes = set(attributes.get("class", "").split())

        if tag == "button" and classes.intersection({"brand", "mobile-brand"}):
            self._current_brand = {
                "class": attributes.get("class"),
                "label": attributes.get("aria-label"),
                "images": [],
                "text": [],
            }
            self.brand_buttons.append(self._current_brand)
        elif tag == "img" and self._current_brand is not None:
            self._current_brand["images"].append(attributes)

    def handle_endtag(self, tag):
        if tag == "button" and self._current_brand is not None:
            self._current_brand = None

    def handle_data(self, data):
        if self._current_brand is not None and data.strip():
            self._current_brand["text"].append(data.strip())


class BrandingTests(unittest.TestCase):
    def test_desktop_and_mobile_use_retell_wordmark_with_forum_suffix(self):
        parser = BrandingParser()
        parser.feed((ROOT / "index.html").read_text())

        self.assertEqual(2, len(parser.brand_buttons))
        for button in parser.brand_buttons:
            self.assertEqual("Retell Forum home", button["label"])
            self.assertEqual(["Forum"], button["text"])
            self.assertEqual(1, len(button["images"]))
            self.assertEqual("retell-wordmark.svg", button["images"][0].get("src"))
            self.assertEqual("", button["images"][0].get("alt"))

        wordmark = ROOT / "retell-wordmark.svg"
        self.assertTrue(wordmark.is_file())
        self.assertIn('viewBox="32 32 595 163"', wordmark.read_text())


if __name__ == "__main__":
    unittest.main()
