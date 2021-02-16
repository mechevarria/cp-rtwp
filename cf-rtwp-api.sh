#!/usr/bin/env bash

status=$(cf app rtwp-keycloak | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  keycloak_url=https://$(cf app rtwp-keycloak | awk '{print $2}' | sed -n 5p)/auth
  echo keycloak_url=$keycloak_url
fi

service=rtwp-hdi-hana
status=$(cf service $service | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
fi

app=rtwp-api

cd rtwp-api

cf push $app \
    -b nodejs_buildpack \
    --no-start \
    -m 128M \
    -k 2048M

cf se $app NPM_CONFIG_PRODUCTION false
cf se $app KEYCLOAK_URL $keycloak_url
cf se $app KEYCLOAK true

# bind hana service
cf bind-service $app $service

cf start $app

cd ..
