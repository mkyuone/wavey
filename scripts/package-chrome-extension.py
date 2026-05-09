#!/usr/bin/env python3
import json
import re
import shutil
import sys
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST_DIR = ROOT / "dist"
BUILD_DIR = DIST_DIR / "chrome-extension"
ZIP_PREFIX = "audionavigator"
PACKAGE_SUFFIX = "chrome"

INCLUDE_PATHS = [
    "_locales",
    "assets",
    "app",
    "extension",
    "favicon.ico",
    "favicon.png",
    "index.html",
    "manifest.json",
    "privacy-policy.html",
    "pwa.webmanifest",
    "service-worker.js",
    "styles.css",
]


def read_app_version():
    script = (ROOT / "app" / "config.js").read_text(encoding="utf-8")
    match = re.search(r'const\s+APP_VERSION\s*=\s*"([^"]+)"', script)
    if not match:
        raise RuntimeError("Could not find APP_VERSION in app/config.js.")
    return match.group(1)


def apply_package_suffix(app_version):
    script_path = BUILD_DIR / "app" / "config.js"
    script = script_path.read_text(encoding="utf-8")
    script = re.sub(
        r'const\s+APP_VERSION\s*=\s*"[^"]+"',
        f'const APP_VERSION = "{app_version}"',
        script,
        count=1,
    )
    script = re.sub(
        r'const\s+APP_VERSION_CHANNEL\s*=\s*"[^"]*"',
        f'const APP_VERSION_CHANNEL = "{PACKAGE_SUFFIX}"',
        script,
        count=1,
    )
    script_path.write_text(script, encoding="utf-8")


def copy_path(source, target):
    if source.is_dir():
        shutil.copytree(source, target)
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)


def stage_extension(app_version):
    if BUILD_DIR.exists():
        shutil.rmtree(BUILD_DIR)
    BUILD_DIR.mkdir(parents=True)

    for relative_path in INCLUDE_PATHS:
        source = ROOT / relative_path
        if not source.exists():
            raise RuntimeError(f"Missing required package path: {relative_path}")
        copy_path(source, BUILD_DIR / relative_path)

    manifest_path = BUILD_DIR / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["version"] = app_version
    manifest["version_name"] = f"{app_version}-{PACKAGE_SUFFIX}"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    apply_package_suffix(app_version)


def zip_extension(app_version):
    zip_path = DIST_DIR / f"{ZIP_PREFIX}-{app_version}-{PACKAGE_SUFFIX}.zip"
    if zip_path.exists():
        zip_path.unlink()

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(BUILD_DIR.rglob("*")):
            if path.is_file():
                archive.write(path, path.relative_to(BUILD_DIR).as_posix())

    return zip_path


def main():
    app_version = read_app_version()
    stage_extension(app_version)
    zip_path = zip_extension(app_version)
    print(f"Packaged Chrome extension: {zip_path.relative_to(ROOT)}")
    print(f"Chrome version name: {app_version}-{PACKAGE_SUFFIX}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Packaging failed: {error}", file=sys.stderr)
        sys.exit(1)
