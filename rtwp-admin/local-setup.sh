#!/usr/bin/env bash

# status=$(cf app rtwp-keycloak | sed -n 3p)
# if [[ $status = "FAILED" ]]; then
#   exit 1
# else
#   export KEYCLOAK=true
#   export KEYCLOAK_URL=https://$(cf app rtwp-keycloak | awk '{print $2}' | sed -n 5p)/auth
#   echo KEYCLOAK_URL=$KEYCLOAK_URL
# fi

KEYCLOAK_URL=https://rtwp-keycloak.cfapps.us10.hana.ondemand.com/auth;

status=$(cf app mcoleman-rtwp-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  export EXPRESS_URL=https://$(cf app mcoleman-rtwp-api | awk '{print $2}' | sed -n 5p)/
  echo EXPRESS_URL=$EXPRESS_URL
fi

envsubst < public/js/env.template.js > public/js/env.js
envsubst < vue.config.template.js > vue.config.js