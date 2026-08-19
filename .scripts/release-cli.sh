#!/bin/sh
set -eu

tag="${1:?release tag argument is required}"

gh release upload "$tag" \
    packages/cli/comptasse.sh \
    packages/cli/install.sh
