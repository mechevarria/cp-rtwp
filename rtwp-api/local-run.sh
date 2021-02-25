#!/usr/bin/env bash

credentials=$(cf service-key rtwp-hdi-hana rtwp-hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" >/tmp/default-services.json

if [[ -z "${KEYCLOAK_URL}" ]]; then
  echo "KEYCLOAK_URL environment variable is not set'"
  exit 1
fi

npm run dev
