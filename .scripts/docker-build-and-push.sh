#!/bin/sh
set -eu

version="${1:?version argument is required}"

: "${REGISTRY:=ghcr.io}"
: "${IMAGE_PREFIX:=ghcr.io/comptasse/application}"

export COMPATSSE_VERSION="$version"

docker compose -f .workflows/build/compose.yml build ci
docker compose -f .workflows/build/compose.yml build api website dashboard

for img in api website dashboard; do
    src="comptasse-${img}:${version}"
    dest="${IMAGE_PREFIX}/${img}"

    docker tag "${src}" "${dest}:${version}"
    docker push "${dest}:${version}"
done
