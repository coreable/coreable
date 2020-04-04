# Coreable GraphQL API Back End

  
### Installing the dependancies

  
`npm install`

  
### Start the SQL Server with docker-compose


`docker-compose up`


### Command Line Interface Actions

  
###### Documentation [http://localhost:3001/](http://localhost:3001/)

`npm run docz:dev   // Run the documentation`

`npm run doc:build  // Build the documentation`

`npm run docz:serve // Serve the documentation for production`

###### GraphQL [http://localhost:3000/graphql](http://localhost:3000/graphql)

`npm run api:dev   // Run the GraphQL API`

`npm run api:build // Build the GraphQL API`

`npm run api:serve // Serve the GraphQL API for production`

`npm run api:test  // Run the unit tests with Instanbul, Mocha and Chai`


#### Fix broken docker

If docker says the port is already in use

  
```
docker-compose down
docker rm -fv $(docker ps -aq)
```