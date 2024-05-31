# Autobases
restore db
docker exec -i pg createdb -U autobase Autobases
docker exec -i pg psql -U autobase Autobases < autobases.sql