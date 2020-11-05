#!/usr/bin/env sh

set -eu

# shellcheck disable=SC2068
docker-compose exec -T mongo mongo localhost:27027/conduit $@
