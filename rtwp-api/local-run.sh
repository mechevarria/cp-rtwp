#!/usr/bin/env bash

credentials=$(cf service-key rtwp-hdi-hana rtwp-hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" >/tmp/default-services.json

status=$(cf app rtwp-keycloak | sed -n 3p)
if [[ $status = "FAILED" ]] && [[ $KEYCLOAK = "true" ]]; then
  exit 1
else
  export KEYCLOAK_URL=https://$(cf app rtwp-keycloak | awk '{print $2}' | sed -n 5p)/auth
  echo $KEYCLOAK_URL
fi

npm run dev
