#!/usr/bin/env sh

set -eu

# shellcheck disable=SC2068
docker-compose exec -T mongo mongorestore --uri mongodb://localhost:27027/conduit $@
