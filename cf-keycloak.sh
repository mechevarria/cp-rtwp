#!/usr/bin/env bash

space=$(cf target | awk '{print $2}' | sed -n 5p)
if [[ $space = "rtwp" ]]; then
  echo "Deploying to the ${space} space"
else
  echo "Login to the 'rtwp' space before deploying keycloak './cf-login.sh rtwp'"
  exit 1
fi

query_jq=$(which jq)
if [[ -z $query_jq ]]; then
  echo "Please install jq, example: sudo apt install jq"
  exit 1
fi

app=rtwp-keycloak

cf push $app \
    -m 1G \
    -k 1G \
    --docker-image quay.io/mechevarria/$app \
    --no-start

service=postgres-keycloak

cf bind-service $app $service

vcap_services={$(cf env $app | sed -n 6,45p)

# parse json for values
pg_user=$(jq -r '.VCAP_SERVICES.postgresql[].credentials.username' <<< "$vcap_services")
pg_database=$(jq -r '.VCAP_SERVICES.postgresql[].credentials.dbname' <<< "$vcap_services")
pg_password=$(jq -r '.VCAP_SERVICES.postgresql[].credentials.password' <<< "$vcap_services")
pg_addr=$(jq -r '.VCAP_SERVICES.postgresql[].credentials.hostname' <<< "$vcap_services")
pg_port=$(jq -r '.VCAP_SERVICES.postgresql[].credentials.port' <<< "$vcap_services")

cf se $app PROXY_ADDRESS_FORWARDING true
cf se $app DB_VENDOR postgres
cf se $app DB_USER $pg_user
cf se $app DB_DATABASE $pg_database
cf se $app DB_PASSWORD $pg_password
cf se $app DB_ADDR $pg_addr
cf se $app DB_PORT $pg_port

cf start $app