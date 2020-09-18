#!/usr/bin/env bash

docker run \
    -p 80:80 \
    --network app-net \
    --env MAPBOX_TOKEN=$MAPBOX_TOKEN \
    --env KEYCLOAK=$KEYCLOAK \
    --env KEYCLOAK_URL=$KEYCLOAK_URL \
    --env SPRINGBOOT_URL=http://springboot-api:8080/ \
    --env EXPRESS_URL=http://express-api:3000/ \
    quay.io/mechevarria/nginx-angular