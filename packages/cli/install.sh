#!/bin/sh
# Arrhes CLI installer for macOS and Linux
# Usage: curl -fsSL https://arrhes.com/cli/install.sh | sh
set -e

REPO="arrhes/application"
INSTALL_DIR="${ARRHES_INSTALL_DIR:-$HOME/.local/bin}"
DEST="${INSTALL_DIR}/arrhes"

command -v curl >/dev/null 2>&1 || { echo "Error: curl is required."; exit 1; }

# Detect platform
OS="$(uname -s)"
ARCH="$(uname -m)"
case "${OS}-${ARCH}" in
    Linux-x86_64)   ASSET="arrhes-linux-x64" ;;
    Darwin-x86_64)  ASSET="arrhes-macos-x64" ;;
    Darwin-arm64)   ASSET="arrhes-macos-arm64" ;;
    *) echo "Unsupported platform: ${OS}-${ARCH}"; exit 1 ;;
esac

URL="https://github.com/${REPO}/releases/latest/download/${ASSET}"

echo "Downloading arrhes CLI (${ASSET})..."
mkdir -p "$INSTALL_DIR"
curl -fsSL --progress-bar "$URL" -o "$DEST"
chmod +x "$DEST"

echo "Installed: $DEST"
echo "Version:   $($DEST --version)"

# ── PATH hint ─────────────────────────────────────────────────────────────────
case ":$PATH:" in
    *":${INSTALL_DIR}:"*)
        echo "Run: arrhes --help"
        ;;
    *)
        printf '\nAdd to PATH: export PATH="$HOME/.local/bin:$PATH"\n'
        printf 'Then reload your shell, or run: source ~/.bashrc\n'
        ;;
esac

