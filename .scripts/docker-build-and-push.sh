#!/bin/sh
set -eu

version="${1:?version argument is required}"

: "${REGISTRY:=ghcr.io}"
: "${IMAGE_PREFIX:=ghcr.io/arrhes/application}"

export ARRHES_VERSION="$version"

docker compose -f .workflows/build/compose.yml build ci
docker compose -f .workflows/build/compose.yml build api website worker dashboard

for img in api website worker dashboard; do
    src="arrhes-${img}:${version}"
    dest="${IMAGE_PREFIX}/${img}"

    docker tag "${src}" "${dest}:${version}"
    docker push "${dest}:${version}"
done
