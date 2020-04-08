# COREABLE

[![buddy pipeline](https://app.buddy.works/coreable/coreable/pipelines/pipeline/249362/badge.svg?token=252cdbde644b14054bdafb973256abc7284acd646c277e9f4ac8a5367f196bfb "buddy pipeline")](https://app.buddy.works/coreable/coreable/pipelines/pipeline/249362)

## Getting Started

1. Install the project dependancies by opening a terminal in the projects directory and `npm install`
2. Change directories to the react folder and install the dependancies with `npm install` 
3. Install the Google Cloud SDK Command Line Interface tools with `curl https://sdk.cloud.google.com | bash`

###### terminal 

```bash
git clone https://github.com/coreable/coreable.git
cd coreable
npm install
npm install --prefix ./react/
curl https://sdk.cloud.google.com | bash
```

## Creating a local MySQL instance for development

While developing and working on the coreable API or Web SPA it may be necessary to start an instance of MySQL server to avoid remote connections to the cloud. Running the API in development mode will use the database settings specified in the development object of the `/api/env/development.env` file.

Make sure the credentials in the `/api/env/development.env` correctly match the credentials in the `/docker-compose.yml` file in the root directory.

To begin a MySQL server, open the terminal and being a docker container with `docker-compose up -d`. This will use the docker-compose.yml file as a configuration to being the database service.

**NOTE**: Docker must be installed.

###### terminal

```bash
cd coreable
docker-compose up
```

The database is ready for connection.

## Building for Development

### API

`npm run dev:api`

### React

`npm run dev:web`

### Documentation

`npm run dev:docz`

## Building for Production

### API

`npm run build:api`

This will compile all the files in the `/api/` directory, excluding the mocha & chai tests, to the output directory of `/dist/`. 

### React

`npm run build:web`

This will compile all the files in the `/react/src/` and `/react/public` directory, excluding the tests, to the output directory of `/dist/public`. 

### Documentation

`npm run build:docz`

This will compile all the files in the `/docs/` directory to the output directory of `/dist/docs`. 

## Running Unit Tests

### API

`npm run test:api`

### React

`npm run test:web`

### Documentation

Docz don't need testing

## Deploying to Google Cloud

Ensure all tests run and application functions as expected

Create a pull request from your branch to the pre-master branch

Wait for a code-review, when everyone has signed off create a pull request from pre-master to master

buddy.works will deploy the master branch to google cloud

## If docker-compose says the port is already in use

###### terminal

```bash
docker-compose down
docker rm -fv $(docker ps -aq)
```