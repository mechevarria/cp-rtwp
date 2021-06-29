#!/usr/bin/env bash

prefix=$1-

if [[ -z "${KEYCLOAK_URL}" ]]; then
  echo "KEYCLOAK_URL environment variable is not set'"
  exit 1
fi

status=$(cf app ${prefix}rtwp-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  express_url=https://$(cf app ${prefix}rtwp-api | awk '{print $2}' | sed -n 5p)/
  echo express_url=$express_url
fi

app=${prefix}rtwp-admin

cd rtwp-admin

npm run build

cf push $app \
    -m 64M \
    -k 128M \
    -b https://github.com/cloudfoundry/nginx-buildpack.git \
    -c '$HOME/cf-custom-command.sh' \
    --no-start

cf se $app KEYCLOAK_URL $KEYCLOAK_URL
cf se $app KEYCLOAK true
cf se $app EXPRESS_URL $express_url

cf start $app
