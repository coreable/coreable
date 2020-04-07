# Coreable GraphQL API Back End

  
### Installing the dependancies

  
`npm install`

`curl https://sdk.cloud.google.com | bash // Install Google Cloud CLI`

  
### Start the local SQL Server with docker-compose


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

###### Connecting a local development instance to google SQL

Make sure you have the proxy connected to the google cloud SQL server

`./cloud_sql_proxy -instances=<INSTANCE_CONNECTION_NAME>=tcp:1433`

Read the documentation here: [https://cloud.google.com/sql/docs/sqlserver/connect-admin-proxy](https://cloud.google.com/sql/docs/sqlserver/connect-admin-proxy)

###### Deploy to Google cloud [http://coreable.appspot.com](http://coreable.appspot.com)

`npm run deploy // Build for production and deploy to Google cloud`

#### Fix broken docker

If docker says the port is already in use

  
```
docker-compose down
docker rm -fv $(docker ps -aq)
```