#!/bin/sh
set -eu

node scripts/setup-database.mjs

if [ "${SEED_DEMO_DATA:-false}" = "true" ]; then
  node scripts/seed-database.mjs
fi

exec "$@"
