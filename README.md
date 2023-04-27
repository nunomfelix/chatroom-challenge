# Chat Room API - Colkie Backend Challenge

This repository is the implementation of the colkie backend challenge, contains a REST API developed using TypeScript and the Nest.js framework. It models a chat-like behavior with several endpoints, enabling chat room creation, user addition, message sending, and message retrieval.

## Features
- Create a chat room
- Add a user to a room
- Send a message to a room
- Get the latest messages from a room

## Additional Features
- Automated tests to verify the correct behavior of the API
- OpenAPI documentation
- Dockerized application

## Installation

To install the dependencies, run:

```bash
  yarn install
```

## Configuration

Before start install PostgreSQL and fill correct configurations in .env file
```bash
#if you are using docker
DB_HOST=database
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=colkie
#else 
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=colkie
```

Some helper script to work with database
```bash
# To create new migration file
yarn migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
yarn schema:drop

# Generate migration from update of entities
yarn migration:generate 
```

## Docker
if you are familiar with docker and docker-compose then you can run built in docker-compose file, which will install and configure application and database for you.

### Docker installation
Download docker from Official website

- Mac https://docs.docker.com/docker-for-mac/install/
- Windows https://docs.docker.com/docker-for-windows/install/
- Ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/

### Docker-compose installation
Download docker from Official website

### Run
Open terminal and navigate to project directory and run the following command.

```bash
PORT=3000 docker-compose up --build
```
Note: application will run on port 3000 (http://localhost:3000)

## Tests
To run the tests, run:
```bash
yarn run test
```

## Dev Server
Launch the dev server
```bash
yarn start:dev
```

## API endpoints

### Create a User
`POST /user`

### Create a Room
`POST /room`

### Add a User to a Room
`POST /room/:roomName/addUser`

### Send a Message to a Room
`POST /message`


### Get Latest Messages from a Room
`GET /message/latest/:roomName`


## OpenAPI Documentation
You can access the OpenAPI documentation by accessing https://localhost:3000/api



## Author

- Author - [Nuno Félix](https://github.com/nunomfelix)
