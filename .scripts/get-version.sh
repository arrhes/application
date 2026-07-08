#!/bin/sh
set -eu

release_tag="${1:-}"
version="${release_tag:-$(tr -d 'v[:space:]' < VERSION)}"
printf '%s\n' "${version#v}"
