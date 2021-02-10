#!/usr/bin/env bash

multiapps=$(cf plugins | grep multiapps)
if [[ -z "$multiapps" ]]; then
  echo "multiapps plugin is required: 'cf install-plugin multiapps'"
  exit 1
fi

echo "Creating temporary mtad.yaml from mta.yaml"
cp mta.yaml mtad.yaml

cf deploy ./ -f

cf create-service-key mcoleman-rtwp-hdi-hana mcoleman-rtwp-hdi-hana-key

rm mtad.yaml
rm cp-rtwp.mtar