#!/usr/bin/env bash

app=btwp-keycloak

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