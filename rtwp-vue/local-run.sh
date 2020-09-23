#!/usr/bin/env bash

status=$(cf app rtwp-keycloak | sed -n 3p)
if [[ $status = "FAILED" ]] && [[ $KEYCLOAK = "true" ]]; then
  exit 1
else
  export KEYCLOAK_URL=https://$(cf app rtwp-keycloak | awk '{print $2}' | sed -n 5p)/auth
  echo $KEYCLOAK_URL
fi

status=$(cf app rtwp-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  export EXPRESS_URL=https://$(cf app rtwp-api | awk '{print $2}' | sed -n 5p)/
  echo express_url=$EXPRESS_URL
fi

envsubst < public/js/env.template.js > public/js/env.js
envsubst < vue.config.template.js > vue.config.js