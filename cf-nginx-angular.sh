#!/usr/bin/env bash

status=$(cf app keycloak-coreui | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  keycloak_url=https://$(cf app keycloak-coreui | awk '{print $2}' | sed -n 5p)/auth
  echo keycloak_url=$keycloak_url
fi

status=$(cf app springboot-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  springboot_url=https://$(cf app springboot-api | awk '{print $2}' | sed -n 5p)/
  echo springboot_url=$springboot_url
fi

status=$(cf app express-api | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  express_url=https://$(cf app express-api | awk '{print $2}' | sed -n 5p)/
  echo express_url=$express_url
fi

app=nginx-angular

cf push $app \
    -m 64M \
    -k 256M \
    --docker-image quay.io/mechevarria/$app \
    --no-start

cf se $app MAPBOX_TOKEN $MAPBOX_TOKEN
cf se $app KEYCLOAK_URL $keycloak_url
cf se $app SPRINGBOOT_URL $springboot_url
cf se $app EXPRESS_URL $express_url
cf se $app KEYCLOAK false

cf start $app