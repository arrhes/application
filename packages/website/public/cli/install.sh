#!/bin/sh
# Comptasse CLI installer for macOS and Linux
# Usage: curl -fsSL https://comptasse.com/cli/install.sh | sh
set -e

REPO="comptasse/application"
INSTALL_DIR="${COMPTASSE_INSTALL_DIR:-$HOME/.local/bin}"
DEST="${INSTALL_DIR}/comptasse"

command -v curl >/dev/null 2>&1 || { echo "Error: curl is required."; exit 1; }

URL="https://github.com/${REPO}/releases/latest/download/comptasse.sh"

echo "Downloading comptasse CLI..."
mkdir -p "$INSTALL_DIR"
curl -fsSL --progress-bar "$URL" -o "$DEST"
chmod +x "$DEST"

echo "Installed: $DEST"
echo "Version:   $($DEST --version)"

# ── PATH hint ─────────────────────────────────────────────────────────────────
case ":$PATH:" in
    *":${INSTALL_DIR}:"*)
        echo "Run: comptasse --help"
        ;;
    *)
        printf '\nAdd to PATH: export PATH="$HOME/.local/bin:$PATH"\n'
        printf 'Then reload your shell, or run: source ~/.bashrc\n'
        ;;
esac

