#!/bin/sh

echo "Wait for the postgres server to start"
sleep 10

echo "creating omnivore database with $(which psql) and user: $POSTGRES_USER"
psql --host $PG_HOST -c "CREATE DATABASE omnivore;"

echo "creating app_user"
psql --host $PG_HOST -d $PG_DB -c "CREATE USER app_user WITH ENCRYPTED PASSWORD '$PG_PASSWORD';"
echo "created app_user"

echo "Remove extension to allow migrations to add it"
psql --host $PG_HOST -c 'DROP EXTENSION "uuid-ossp" CASCADE;' --user omnivore

echo "running migrations as $POSTGRES_USER"
PG_HOST=omnivore PG_USER=$POSTGRES_USER PG_PASSWORD=$POSTGRES_PASSWORD yarn workspace @omnivore/db migrate

psql --host $PG_HOST -d $PG_DB -c "GRANT omnivore_user TO app_user;"
echo "granted omnivore_user to app_user"

yarn workspace @omnivore/api start 
