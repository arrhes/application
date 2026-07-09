#!/bin/sh
set -eu

release_tag="${1:-}"

if [ -n "$release_tag" ]; then
    printf '%s\n' "$release_tag"
else
    cat VERSION
fi
