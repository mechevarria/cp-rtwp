#!/usr/bin/env bash

echo "Running environment variable replacement commands via bash since envsubst is not available"
cp ./dist/js/env.template.js ./dist/js/env.js

search='${KEYCLOAK_URL}'
replace=$KEYCLOAK_URL
sed -i s@$search@$replace@g ./dist/js/env.js

search='${KEYCLOAK}'
replace=$KEYCLOAK
sed -i s@$search@$replace@g ./dist/js/env.js

search='http://localhost:4200'
replace=$EXPRESS_URL
sed -i s@$search@$replace@g ./nginx.conf

echo "Running buildpack command"
varify -buildpack-yml-path ./buildpack.yml ./nginx.conf $HOME/modules $DEP_DIR/nginx/modules && nginx -p $PWD -c ./nginx.conf
