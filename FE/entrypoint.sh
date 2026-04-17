#!/bin/sh

echo "Starting environment injection..."

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

cat /usr/share/nginx/html/env.js

echo "Environment setup completed!"