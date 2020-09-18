#!/usr/bin/env bash

docker build \
  -t quay.io/mechevarria/btwp-keycloak .

docker push quay.io/mechevarria/btwp-keycloak