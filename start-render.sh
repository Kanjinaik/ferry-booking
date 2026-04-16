#!/bin/sh
set -e

if [ "${DB_CONNECTION}" = "mysq1" ]; then
  export DB_CONNECTION="mysql"
fi

php artisan optimize:clear
php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\FerrySeeder --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
