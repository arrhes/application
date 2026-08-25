#!/bin/sh
set -eu

tag="${1:?release tag argument is required}"

# Generate the CLI version file from the single source of truth (root VERSION).
# comptasse.sh reads this file at runtime — there is no hardcoded version
# anywhere in the distributed CLI.
VER=$(cat VERSION | tr -d 'v[:space:]')
printf '%s\n' "$VER" > packages/cli/version
echo "CLI version file generated from VERSION: $VER"

gh release upload "$tag" \
    packages/cli/comptasse.sh \
    packages/cli/install.sh \
    packages/cli/version
