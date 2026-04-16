#!/bin/sh
set -e

php artisan optimize:clear
php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\FerrySeeder --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
