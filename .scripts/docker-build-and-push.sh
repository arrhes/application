#!/bin/sh
set -eu

version="${1:?version argument is required}"

: "${REGISTRY:=ghcr.io}"
: "${IMAGE_PREFIX:=ghcr.io/comptasse/application}"

export COMPTASSE_VERSION="$version"

docker compose -f .workflows/build/compose.yml build ci
docker compose -f .workflows/build/compose.yml build api website dashboard
docker compose -f .workflows/build/compose.yml build comptasse

for img in api website dashboard; do
    src="comptasse-${img}:${version}"
    dest="${IMAGE_PREFIX}/${img}"

    docker tag "${src}" "${dest}:${version}"
    docker push "${dest}:${version}"
done

# All-in-one image (dashboard + API + CLI), used by https://comptasse.com/install.sh
docker tag "comptasse/comptasse:${version}" "${IMAGE_PREFIX}/comptasse:${version}"
docker tag "${IMAGE_PREFIX}/comptasse:${version}" "${IMAGE_PREFIX}/comptasse:latest"
docker push "${IMAGE_PREFIX}/comptasse:${version}"
docker push "${IMAGE_PREFIX}/comptasse:latest"