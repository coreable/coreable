# Coreable Back End

## Install dependancies

`npm i`

## Start the SQL Server

`docker-compose up`

## Start the server

`npm run start:dev`

## Access Server

[http://localhost:3000/graphql](http://localhost:3000/graphql)

## Fix broken docker

If docker says the port is already in use

```
docker-compose down
docker rm -fv $(docker ps -aq)
```