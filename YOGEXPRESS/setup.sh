dropdb yogexpress --if-exists

createdb yogexpress

knex migrate:latest --knexfile app/knexfile.js
knex migrate:latest --env test --knexfile app/knexfile.js

knex seed:run --knexfile app/knexfile.js
