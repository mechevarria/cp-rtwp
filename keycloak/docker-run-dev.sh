#!/usr/bin/env bash

docker run \
    -p 8180:8080 \
    -p 8443:8443 \
    -e DB_VENDOR=postgres \
    -e DB_USER=postgres \
    -e DB_DATABASE=postgres \
    -e DB_PASSWORD=$PG_PASSWORD \
    -e DB_ADDR=$PG_ADDR \
    --mount type=bind,source=${PWD}/themes,target=/opt/jboss/keycloak/themes \
    quay.io/mechevarria/btwp-keycloak