#!/usr/bin/env bash

credentials=$(cf service-key btwp-hdi-hana btwp-hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" >/tmp/default-services.json

status=$(cf app btwp-keycloak | sed -n 3p)
if [[ $status = "FAILED" ]] && [[ $KEYCLOAK = "true" ]]; then
  exit 1
else
  export KEYCLOAK_URL=https://$(cf app btwp-keycloak | awk '{print $2}' | sed -n 5p)/auth
  echo $KEYCLOAK_URL
fi

npm run dev
