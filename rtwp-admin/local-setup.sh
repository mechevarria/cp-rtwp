#!/usr/bin/env bash


prefix=$1-

if [[ -z "${KEYCLOAK_URL}" ]]; then
  echo "KEYCLOAK_URL environment variable is not set'"
  exit 1
fi

export KEYCLOAK=true

status=$(cf app ${prefix}rtwp-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  export EXPRESS_URL=https://$(cf app ${prefix}rtwp-api | awk '{print $2}' | sed -n 5p)/

  echo EXPRESS_URL=$EXPRESS_URL
fi

envsubst < public/js/env.template.js > public/js/env.js
envsubst < vue.config.template.js > vue.config.js