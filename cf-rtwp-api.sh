#!/usr/bin/env bash

prefix=$1-

if [[ -z "${KEYCLOAK_URL}" ]]; then
  echo "KEYCLOAK_URL environment variable is not set'"
  exit 1
fi

service=rtwp-hdi-hana
status=$(cf service $service | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
fi

app=${prefix}rtwp-api

cd rtwp-api

cf push $app \
    -b nodejs_buildpack \
    --no-start \
    -m 128M \
    -k 2048M

cf se $app NPM_CONFIG_PRODUCTION false
cf se $app KEYCLOAK_URL $KEYCLOAK_URL
cf se $app KEYCLOAK true

# bind hana service
cf bind-service $app $service

cf start $app

cd ..
