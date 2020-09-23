#!/usr/bin/env bash

docker build \
  -t quay.io/mechevarria/rtwp-keycloak .

docker push quay.io/mechevarria/rtwp-keycloak