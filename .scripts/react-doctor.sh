#!/bin/sh
set -eu

pnpm install --frozen-lockfile
npx react-doctor --staged --fail-on warning
