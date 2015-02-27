#!/bin/bash
set -e

exec ember serve --proxy http://$IE_PORT_3001_TCP_ADDR:$IE_PORT_3001_TCP_PORT

exec "$@"
