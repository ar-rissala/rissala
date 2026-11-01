"""
Secure Markdown engine for Rissala.net.
- Supports standard GFM Markdown (headings, bold, italic, code, fenced code blocks,
  tables, blockquotes, lists, links, images, horizontal rules, footnotes).
- Supports Rissala custom pedagogical containers (:::info, :::warning, :::card) and
  Arabic typography classes (.arabic, .arabic-inline, .arabic-large, .letter-showcase, .step-card).
- Enforces strict HTML allowlist sanitization to prevent XSS injections (<script>,
  javascript: URLs, on* event handlers, etc.).
"""
import html
import re
from html.parser import HTMLParser
from django.utils.safestring import mark_safe
from django.utils.text import slugify

ALLOWED_TAGS = {
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr",
    "strong", "b", "em", "i", "u", "s", "del", "mark", "small", "sup", "sub",
    "code", "pre", "blockquote",
    "ul", "ol", "li",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    "div", "span", "section", "article", "header", "footer", "aside", "figure", "figcaption",
    "a", "img",
    "svg", "path", "circle", "rect", "line", "polyline", "polygon",
}

VOID_TAGS = {"br", "hr", "img"}

STRIP_CONTENT_TAGS = {"script", "style", "iframe", "object", "embed", "applet", "form"}

ALLOWED_ATTRS = {
    "*": {"class", "id", "dir", "lang", "title", "role", "aria-label", "aria-hidden", "data-icon"},
    "a": {"href", "target", "rel"},
    "img": {"src", "alt", "width", "height", "loading"},
    "td": {"colspan", "rowspan"},
    "th": {"colspan", "rowspan", "scope"},
    "svg": {"viewbox", "width", "height", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "xmlns"},
    "path": {"d", "fill", "stroke"},
    "circle": {"cx", "cy", "r"},
    "rect": {"x", "y", "width", "height", "rx"},
    "line": {"x1", "y1", "x2", "y2"},
    "polyline": {"points"},
    "polygon": {"points"},
}

SAFE_URL_SCHEMES = ("http://", "https://", "mailto:", "/", "#")


def _is_safe_url(url: str) -> bool:
    cleaned = re.sub(r"[\s\x00-\x1f]+", "", (url or "")).lower()
    if not cleaned:
        return True
    if cleaned.startswith(("javascript:", "vbscript:", "data:")):
        return False
    return cleaned.startswith(SAFE_URL_SCHEMES) or ":" not in cleaned


class StrictHTMLSanitizer(HTMLParser):
    """Allowlist HTML sanitizer that strips unsafe tags, scripts, event attributes, and dangerous URLs."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        tag_lower = tag.lower()
        if tag_lower in STRIP_CONTENT_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth > 0:
            return
        if tag_lower not in ALLOWED_TAGS:
            return

        allowed_for_tag = ALLOWED_ATTRS.get("*", set()) | ALLOWED_ATTRS.get(tag_lower, set())
        safe_attrs = []
        has_target_blank = False

        for attr_name, attr_val in attrs:
            name_lower = attr_name.lower()
            if name_lower == "classname":
                name_lower = "class"
            if name_lower.startswith("on") or name_lower not in allowed_for_tag:
                continue
            val = attr_val or ""
            if name_lower in ("href", "src") and not _is_safe_url(val):
                continue
            if name_lower == "target" and val == "_blank":
                has_target_blank = True
            safe_attrs.append(f'{name_lower}="{html.escape(val, quote=True)}"')

        if tag_lower == "a" and has_target_blank:
            if not any(a.startswith("rel=") for a in safe_attrs):
                safe_attrs.append('rel="noopener noreferrer"')

        attr_str = (" " + " ".join(safe_attrs)) if safe_attrs else ""
        if tag_lower in VOID_TAGS:
            self.out.append(f"<{tag_lower}{attr_str} />")
        else:
            self.out.append(f"<{tag_lower}{attr_str}>")

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower in STRIP_CONTENT_TAGS:
            if self._skip_depth > 0:
                self._skip_depth -= 1
            return
        if self._skip_depth > 0:
            return
        if tag_lower in ALLOWED_TAGS and tag_lower not in VOID_TAGS:
            self.out.append(f"</{tag_lower}>")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        if self._skip_depth == 0:
            self.out.append(html.escape(data, quote=False))

    def handle_entityref(self, name):
        if self._skip_depth == 0:
            self.out.append(f"&{name};")

    def handle_charref(self, name):
        if self._skip_depth == 0:
            self.out.append(f"&#{name};")


def sanitize_html(raw_html: str) -> str:
    sanitizer = StrictHTMLSanitizer()
    sanitizer.feed(raw_html or "")
    sanitizer.close()
    return "".join(sanitizer.out)


def _preprocess_rissala_directives(md_text: str) -> str:
    """Transform JSX className attributes and Rissala custom :::info / :::warning / :::card blocks."""
    text = md_text.replace("className=", "class=")

    # :::info / :::warning blocks
    def replace_callout(match):
        box_type = match.group(1)
        title = (match.group(2) or "").strip()
        body = (match.group(3) or "").strip()
        body_html = _render_inline_markdown(body).replace("\n\n", "</p><p class=\"mt-2\">")
        if box_type == "warning":
            box_class = "warning-box bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-8"
            title_class = "warning-box-title text-lg font-bold text-amber-500 mb-2 flex items-center gap-2"
        else:
            box_class = "info-box bg-muted/30 border border-border/50 rounded-xl p-6 my-8"
            title_class = "info-box-title text-lg font-bold text-foreground mb-2 flex items-center gap-2"

        title_html = f'<div class="{title_class}">{_render_inline_markdown(title)}</div>' if title else ""
        return (
            f'\n<div class="{box_class}">'
            f"{title_html}"
            f'<div class="info-box-content text-sm text-muted-foreground leading-relaxed"><p>{body_html}</p></div>'
            f"</div>\n"
        )

    text = re.sub(
        r":::(info|warning)[ \t]*\r?\n(?:###[ \t]*(.*?)\r?\n)?([\s\S]*?)\r?\n:::",
        replace_callout,
        text,
    )

    # :::card icon=... title=... blocks
    def replace_card(match):
        icon = (match.group(1) or "").strip()
        title = (match.group(2) or "").strip()
        body = (match.group(3) or "").strip()
        return (
            f'\n<div class="step-card flex flex-col items-center text-center p-6 rounded-xl border border-border/50 bg-card">'
            f'<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold" data-icon="{html.escape(icon)}">★</div>'
            f'<h3 class="font-bold mb-2 text-foreground">{_render_inline_markdown(title)}</h3>'
            f'<p class="text-sm text-muted-foreground">{_render_inline_markdown(body)}</p>'
            f"</div>\n"
        )

    text = re.sub(
        r":::card\s+icon=(\S+)\s+title=([^\r\n]+)\r?\n([\s\S]*?)\r?\n:::",
        replace_card,
        text,
    )
    return text


def _render_inline_markdown(text: str) -> str:
    """Render inline markdown: images, links, bold, italic, inline code."""
    if not text:
        return ""
    # Inline code `...`
    text = re.sub(
        r"`([^`]+)`",
        lambda m: f'<code class="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm">{html.escape(m.group(1))}</code>',
        text,
    )
    # Images ![alt](src)
    text = re.sub(
        r"!\[([^\]]*)\]\(([^)]+)\)",
        lambda m: f'<img src="{html.escape(m.group(2), quote=True)}" alt="{html.escape(m.group(1), quote=True)}" loading="lazy" class="rounded-xl my-4 max-w-full h-auto" />',
        text,
    )
    # Links [label](href)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{html.escape(m.group(2), quote=True)}" class="text-primary font-medium hover:underline">{m.group(1)}</a>',
        text,
    )
    # Bold **...**
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    # Italic *...*
    text = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", text)
    return text


def _parse_markdown_to_html(md_text: str) -> str:
    """Convert preprocessed Markdown to structured HTML."""
    text = _preprocess_rissala_directives(md_text or "")
    lines = text.replace("\r\n", "\n").split("\n")
    out = []
    i = 0
    n = len(lines)

    in_code_block = False
    code_lines = []
    in_ul = False
    in_ol = False
    in_blockquote = False
    bq_lines = []

    def close_lists_and_quotes():
        nonlocal in_ul, in_ol, in_blockquote, bq_lines
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False
        if in_blockquote:
            content_html = "<br />".join(_render_inline_markdown(l) for l in bq_lines)
            out.append(
                f'<blockquote class="border-l-4 border-primary bg-primary/5 py-4 px-6 my-6 rounded-r-lg italic text-foreground">{content_html}</blockquote>'
            )
            in_blockquote = False
            bq_lines = []

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Fenced code block
        if stripped.startswith("```"):
            close_lists_and_quotes()
            if not in_code_block:
                in_code_block = True
                code_lines = []
            else:
                escaped_code = html.escape("\n".join(code_lines))
                out.append(
                    f'<pre class="my-6 p-4 rounded-xl bg-muted overflow-x-auto text-sm font-mono"><code>{escaped_code}</code></pre>'
                )
                in_code_block = False
            i += 1
            continue

        if in_code_block:
            code_lines.append(line)
            i += 1
            continue

        # Blank line
        if not stripped:
            close_lists_and_quotes()
            i += 1
            continue

        # Raw HTML block pass-through (will be strictly sanitized right after)
        if stripped.startswith(("<div", "</div", "<table", "</table", "<thead", "</thead", "<tbody", "</tbody", "<tr", "</tr", "<th", "<td")):
            close_lists_and_quotes()
            out.append(_render_inline_markdown(line))
            i += 1
            continue

        # Horizontal Rule
        if re.match(r"^([-*_])\1{2,}$", stripped):
            close_lists_and_quotes()
            out.append('<hr class="my-8 border-border/60" />')
            i += 1
            continue

        # Headings
        heading_match = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if heading_match:
            close_lists_and_quotes()
            level = len(heading_match.group(1))
            title_raw = heading_match.group(2).strip()
            heading_id = slugify(title_raw, allow_unicode=True) or f"section-{i}"
            title_html = _render_inline_markdown(title_raw)
            out.append(f'<h{level} id="{heading_id}">{title_html}</h{level}>')
            i += 1
            continue

        # GFM Table
        if "|" in stripped and i + 1 < n and re.match(r"^\|?[\s:-]+\|[\s|:-]+$", lines[i + 1].strip()):
            close_lists_and_quotes()
            headers = [c.strip() for c in stripped.strip("|").split("|")]
            i += 2  # skip header and separator row
            rows = []
            while i < n and "|" in lines[i].strip() and lines[i].strip():
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            thead_html = "".join(f"<th>{_render_inline_markdown(h)}</th>" for h in headers)
            tbody_rows = []
            for r in rows:
                tds = "".join(f"<td>{_render_inline_markdown(c)}</td>" for c in r)
                tbody_rows.append(f"<tr>{tds}</tr>")
            out.append(
                f'<div class="table-wrapper"><table><thead><tr>{thead_html}</tr></thead><tbody>{"".join(tbody_rows)}</tbody></table></div>'
            )
            continue

        # Blockquote
        if stripped.startswith(">"):
            if in_ul or in_ol:
                close_lists_and_quotes()
            in_blockquote = True
            bq_lines.append(re.sub(r"^>\s?", "", stripped))
            i += 1
            continue

        # Unordered list
        ul_match = re.match(r"^[*+-]\s+(.+)$", stripped)
        if ul_match:
            if in_ol or in_blockquote:
                close_lists_and_quotes()
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{_render_inline_markdown(ul_match.group(1))}</li>")
            i += 1
            continue

        # Ordered list
        ol_match = re.match(r"^\d+\.\s+(.+)$", stripped)
        if ol_match:
            if in_ul or in_blockquote:
                close_lists_and_quotes()
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{_render_inline_markdown(ol_match.group(1))}</li>")
            i += 1
            continue

        # Paragraph
        close_lists_and_quotes()
        para_lines = [stripped]
        i += 1
        while i < n:
            nxt = lines[i].strip()
            if (
                not nxt
                or nxt.startswith(("#", ">", "```", "<div", "</div", "<table", "---"))
                or re.match(r"^([*+-]|\d+\.)\s+", nxt)
                or ("|" in nxt and i + 1 < n and re.match(r"^\|?[\s:-]+\|[\s|:-]+$", lines[i + 1].strip()))
            ):
                break
            para_lines.append(nxt)
            i += 1
        out.append(f"<p>{_render_inline_markdown(' '.join(para_lines))}</p>")

    close_lists_and_quotes()
    return "\n".join(out)


def render_markdown_safe(markdown_text: str) -> str:
    """Render Markdown to sanitized HTML safe against XSS."""
    raw_html = _parse_markdown_to_html(markdown_text or "")
    clean_html = sanitize_html(raw_html)
    return mark_safe(clean_html)


def parse_frontmatter(raw_content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from a Markdown file and return (metadata_dict, markdown_body)."""
    import yaml

    text = (raw_content or "").lstrip("\ufeff")
    if not text.startswith("---"):
        return {}, text
    parts = re.split(r"^---\s*$", text, maxsplit=2, flags=re.MULTILINE)
    if len(parts) < 3:
        return {}, text
    yaml_block = parts[1]
    body = parts[2].strip()
    try:
        meta = yaml.safe_load(yaml_block)
        if not isinstance(meta, dict):
            meta = {}
    except Exception:
        meta = {}
    return meta, body

