from __future__ import annotations

import re
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
CSS = (ROOT / "styles.css").read_text(encoding="utf-8")
JS = (ROOT / "main.js").read_text(encoding="utf-8")


class StructureParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.classes: list[str] = []
        self.h1_count = 0
        self.buttons: list[dict[str, str | None]] = []
        self.dialogs: list[dict[str, str | None]] = []
        self.svgs: list[dict[str, str | None]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if data.get("id"):
            self.ids.add(str(data["id"]))
        if data.get("class"):
            self.classes.extend(str(data["class"]).split())
        if tag == "h1":
            self.h1_count += 1
        elif tag == "button":
            self.buttons.append(data)
        elif tag == "dialog":
            self.dialogs.append(data)
        elif tag == "svg":
            self.svgs.append(data)


class PortfolioContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.parser = StructureParser()
        cls.parser.feed(INDEX)

    def test_preserves_single_primary_heading_and_core_sections(self) -> None:
        self.assertEqual(self.parser.h1_count, 1)
        for section_id in {"top", "difference", "work", "baseline", "contact"}:
            self.assertIn(section_id, self.parser.ids)

    def test_hero_contains_accessible_evidence_trace(self) -> None:
        self.assertIn("hero-trace", self.parser.classes)
        self.assertIn("hero-blueprint", self.parser.classes)
        self.assertRegex(INDEX, r'class="[^"]*hero-trace[^"]*"[^>]*(?:role="img"|aria-labelledby=)')
        self.assertIn("bar__progress", self.parser.classes)

    def test_five_systems_have_stable_ids_and_diagrams(self) -> None:
        expected = {
            "system-observatory",
            "system-rag",
            "system-workbench",
            "system-procure",
            "system-orchestration",
        }
        self.assertTrue(expected.issubset(self.parser.ids))
        self.assertEqual(self.parser.classes.count("system-diagram"), 5)
        self.assertEqual(len(re.findall(r'data-system-index="[1-5]"', INDEX)), 5)

    def test_work_spine_and_release_pipeline_are_present(self) -> None:
        self.assertIn("work-spine", self.parser.classes)
        self.assertEqual(len(re.findall(r'class="work-spine__link', INDEX)), 5)
        self.assertIn("release-pipeline", self.parser.classes)
        self.assertEqual(len(re.findall(r'class="release-pipeline__stage', INDEX)), 7)

    def test_screenshots_are_keyboard_accessible_evidence_panels(self) -> None:
        self.assertEqual(self.parser.classes.count("shot__frame"), 5)
        self.assertEqual(self.parser.classes.count("shot__open"), 5)
        open_buttons = [button for button in self.parser.buttons if "shot__open" in str(button.get("class", ""))]
        self.assertEqual(len(open_buttons), 5)
        for button in open_buttons:
            self.assertTrue(button.get("aria-label"))
            self.assertTrue(button.get("data-src"))
            self.assertTrue(button.get("data-caption"))

    def test_native_evidence_dialog_is_labelled(self) -> None:
        dialogs = [dialog for dialog in self.parser.dialogs if dialog.get("id") == "evidence-dialog"]
        self.assertEqual(len(dialogs), 1)
        self.assertEqual(dialogs[0].get("aria-labelledby"), "evidence-dialog-title")
        self.assertIn("evidence-dialog__close", self.parser.classes)
        self.assertIn("evidence-dialog-image", self.parser.ids)

    def test_closing_engagement_record_and_stamp_are_present(self) -> None:
        self.assertIn("engagement-record", self.parser.classes)
        self.assertIn("availability-stamp", self.parser.classes)

    def test_css_defines_motion_states_and_accessibility_fallback(self) -> None:
        required_tokens = [
            ".bar__progress",
            ".bar--compact",
            ".bar__nav a.is-active",
            ".hero-trace",
            ".system-diagram",
            ".work-spine",
            ".shot__frame",
            ".shot__open",
            ".evidence-dialog",
            ".release-pipeline",
            ".engagement-record",
            ".spec tbody tr.is-revealed",
            "@media (prefers-reduced-motion: reduce)",
        ]
        for token in required_tokens:
            with self.subTest(token=token):
                self.assertIn(token, CSS)
        self.assertIn("--page-progress", CSS)

    def test_javascript_has_isolated_initializers(self) -> None:
        for function_name in [
            "initHero",
            "initRevealObservers",
            "initNavigation",
            "initEvidenceDialog",
            "initMobileTableLabels",
        ]:
            with self.subTest(function_name=function_name):
                self.assertRegex(JS, rf"function\s+{function_name}\s*\(")
        self.assertIn("IntersectionObserver", JS)
        self.assertIn("showModal", JS)
        self.assertIn("--page-progress", JS)

    def test_javascript_parses(self) -> None:
        result = subprocess.run(
            ["node", "--check", str(ROOT / "main.js")],
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_no_runtime_animation_dependency_is_added(self) -> None:
        scripts = re.findall(r'<script[^>]+src="([^"]+)"', INDEX)
        self.assertEqual(scripts, ["main.js"])
        self.assertNotRegex(INDEX.lower(), r"gsap|motion\.dev|rive|three\.js")


if __name__ == "__main__":
    unittest.main()
