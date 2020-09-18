#!/usr/bin/env bash

set -e

envsubst < /usr/share/nginx/html/assets/js/env.template.js > /usr/share/nginx/html/assets/js/env.js
envsubst '\"${SPRINGBOOT_URL},\${EXPRESS_URL}' < /tmp/nginx.template.conf > /etc/nginx/conf.d/default.conf

exec "$@"