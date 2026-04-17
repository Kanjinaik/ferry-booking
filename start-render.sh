#!/bin/sh
set -e

DB_CONNECTION_CLEAN="$(printf '%s' "${DB_CONNECTION}" | tr -d '\r' | xargs)"

if [ "${DB_CONNECTION_CLEAN}" = "mysq1" ]; then
  DB_CONNECTION_CLEAN="mysql"
fi

if [ -n "${DB_CONNECTION_CLEAN}" ]; then
  export DB_CONNECTION="${DB_CONNECTION_CLEAN}"
fi

php artisan optimize:clear
php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\FerrySeeder --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
