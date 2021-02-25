#!/usr/bin/env bash

space=$(cf target | awk '{print $2}' | sed -n 5p)

if [[ $space = "rtwp" ]]; then
  echo "Deploying to the ${space} space"
else
  echo "Login to the 'rtwp' space before deploying keycloak './cf-login.sh rtwp'"
  exit 1
fi  

app=rtwp-keycloak

cf push $app \
    -m 1G \
    -k 1G \
    --docker-image quay.io/mechevarria/$app \
    --no-start

cf se $app PROXY_ADDRESS_FORWARDING true
cf se $app DB_VENDOR postgres
cf se $app DB_USER postgres
cf se $app DB_DATABASE postgres
cf se $app DB_PASSWORD $PG_PASSWORD
cf se $app DB_ADDR $PG_ADDR

cf start $app