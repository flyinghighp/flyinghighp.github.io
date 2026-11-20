"""Apply a reviewed identity dictionary to supported engineering files."""
import argparse
import io
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import tempfile
import zipfile

STEP_TOKEN = re.compile(r"/\*.*?\*/|'(?:[^']|'')*'", re.DOTALL)
TEXT = {".txt", ".csv", ".tsv"}
STEP = {".step", ".stp", ".p21"}
MAX_BYTES = 128 * 1024**2


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("mapping", type=Path)
    parser.add_argument("attempt", type=Path)
    args = parser.parse_args()
    source = args.input.resolve(strict=True)
    output = args.attempt.resolve()
    if not source.is_dir() or source == output or source in output.parents:
        parser.error("Provide an input directory and a separate attempt directory.")
    if output.exists():
        parser.error("Choose a fresh attempt directory.")

    mapping = json.loads(args.mapping.read_text(encoding="utf-8"))
    if not isinstance(mapping, dict) or not mapping:
        parser.error("The mapping must be a nonempty JSON object.")
    aliases = {}
    for original, replacement in mapping.items():
        if not original.strip() or not isinstance(replacement, str):
            parser.error("Every identity needs a nonempty string replacement.")
        if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_. @-]*", replacement):
            parser.error("Use portable ASCII pseudonyms.")
        key = original.casefold()
        if key in aliases and aliases[key] != replacement:
            parser.error("Conflicting case variants in the mapping.")
        aliases[key] = replacement

    pattern = re.compile(
        r"(?<![^\W_])(?:" + "|".join(map(re.escape, sorted(aliases, key=len, reverse=True)))
        + r")(?![^\W_])", re.IGNORECASE
    )
    if len({value.casefold() for value in aliases.values()}) != len(aliases):
        parser.error("Distinct identities require distinct pseudonyms.")
    if any(pattern.search(value) for value in aliases.values()):
        parser.error("Pseudonyms must not contain mapped identities.")

    def replace(value):
        return pattern.sub(lambda match: aliases.get(match.group().casefold(), match.group()), value)

    def rename(path):
        parts = path.parts
        return PurePosixPath(*(replace(part) for part in parts[:-1]),
                             replace(path.stem) + path.suffix)

    def rewrite(name, data, depth=0):
        extension = name.suffix.lower()
        if not data:
            raise ValueError("Empty source")
        if extension in TEXT:
            return replace(data.decode("utf-8")).encode("utf-8")
        if extension in STEP:
            content = data.decode("ascii")
            if not content.lstrip().startswith("ISO-10303-21;") or not content.rstrip().endswith("END-ISO-10303-21;"):
                raise ValueError("Invalid STEP envelope")

            def edit_token(match):
                token = match.group()
                if token.startswith("/*"):
                    return "/*" + replace(token[2:-2]) + "*/"
                value = token[1:-1].replace("''", "'")
                return "'" + replace(value).replace("'", "''") + "'"

            updated = STEP_TOKEN.sub(edit_token, content)
            if pattern.search(updated):
                raise ValueError("Mapped identity remains in STEP")
            return updated.encode("ascii")
        if extension == ".zip" and depth < 4:
            buffer = io.BytesIO()
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                entries = archive.infolist()
                if sum(entry.file_size for entry in entries) > MAX_BYTES:
                    raise ValueError("Archive exceeds expanded size limit")
                with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as result:
                    seen = set()
                    for entry in entries:
                        member = PurePosixPath(entry.filename)
                        if member.is_absolute() or ".." in member.parts or "\\" in entry.filename:
                            raise ValueError("Unsafe archive member path")
                        if entry.is_dir():
                            continue
                        renamed = rename(member)
                        if str(renamed).casefold() in seen:
                            raise ValueError("Archive filename collision")
                        seen.add(str(renamed).casefold())
                        result.writestr(str(renamed), rewrite(member, archive.read(entry), depth + 1))
            return buffer.getvalue()
        raise ValueError("Unsupported file or nested archive")

    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent) as temporary:
        stage = Path(temporary) / "attempt"
        corpus = stage / "corpus"
        corpus.mkdir(parents=True)
        code = stage / "code"
        code.mkdir()
        shutil.copyfile(__file__, code / "deid.py")
        seen = set()
        omissions = []
        written = 0
        for index, file in enumerate(sorted(source.rglob("*")), 1):
            if file.is_symlink() or not file.is_file():
                continue
            relative = PurePosixPath(file.relative_to(source))
            destination = rename(relative)
            if pattern.search(str(destination)):
                omissions.append(f"Input entry {index} | mapped identity remains in path")
                continue
            key = str(destination).casefold()
            if key in seen:
                omissions.append(f"Input entry {index} | output path collision")
                continue
            seen.add(key)
            try:
                if file.stat().st_size > MAX_BYTES:
                    raise ValueError("Source exceeds size limit")
                updated = rewrite(relative, file.read_bytes())
            except (ValueError, OSError, RuntimeError, zipfile.BadZipFile, NotImplementedError):
                omissions.append(f"Input entry {index} ({relative.suffix.lower() if relative.suffix.lower() in STEP | TEXT | {'.zip'} else 'other'}) | unsupported, invalid, oversized, or unresolved")
                continue
            target = corpus / destination
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(updated)
            written += 1
        (stage / "README.txt").write_text(
            "Run with Python 3.11 or newer. No third-party packages.\n"
            "python code/deid.py INPUT PRIVATE_MAPPING.json NEW_ATTEMPT_DIRECTORY\n"
            "Mapping is a JSON object from reviewed source identities to unique pseudonyms.\n"
            "Keep the private mapping outside INPUT and outside the attempt.\n"
            "Supported formats include ASCII STEP, UTF-8 TXT/CSV/TSV and ZIPs containing supported files.\n"
            "PDF, native CAD, imagery, OCR and other archive formats require separate handlers.\n"
            "STEP editing covers literal strings and comments. Encoded text and native CAD links require separate validation.\n"
            "Text references update when mapped identities appear literally. Review reference resolution before submission.\n"
            f"Processed {written} files. Omitted {len(omissions)} entries.\n"
            + "\n".join(omissions) + "\n", encoding="utf-8"
        )
        stage.rename(output)
    print(f"Processed {written} files. Omitted {len(omissions)} entries.")


if __name__ == "__main__":
    main()
