# MERN Stack Journey Project API

API and backend for the MERN Stack Joruney project.

Jump to the [Getting Started](#getting-started) section
to launch the API for the application.

## Technologies Used

### Application Tools

- `MongoDB`
- `GraphQL`
- `Node.js`

### Dev Tools

- `Eslint`
- `Nodemon`

## NPM Scripts

- `start`: Starts app.
- `lint`: Runs linter for code.
- `test`: Script for running a test of app.

## Endpoints

In the following, `BASE_URL` is the domain of wherever the
backend is being launched. For example, if launching
it locally, it is `localhost:3000` by default.

- `BASE_URL/graphql`: Opens Apollo Playground for testing of GraphQL queries.

## Getting Started

To run the backend, you must do the following:

1. [Run the MongoDB server](#running-a-mongodb-server)
2. [Set up a `.env` file](#setting-up-an-env-file)
3. [Run the backend](#running-the-api) for the project

### Running a MongoDB Server

This API runs on a MongoDB backend. A MongoDB database
is required for the application to run. There are a couple
ways to get this running:

- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
- Follow the instructions for running a local version of
  MongoDB [on their website](https://www.mongodb.com/docs/manual/installation/)
- Follow the instructions for running a Docker version of
  MongoDB [on their website](https://www.mongodb.com/docs/manual/administration/install-community/)

### Setting up an env file

1. In the `api` folder, create a file named `.env`, that looks
   something like the following. Values can be adjusted based on
   where the backend is being hosted.

    ```bash
    ## DB

    # Local
    DB_URL='mongodb://localhost/issuetracker'
    
    # Docker - replace {port} with port that MongoDB Docker
    # container is running on
    # DB_URL='mongodb://localhost:{port}/issuetracker'

    # Atlas - replace UUU: user, PPP: password, XXX: hostname
    # DB_URL=mongodb+srv://UUU:PPP@XXX.mongodb.net/issuetracker?retryWrites=true

    # mLab - replace UUU: user, PPP: password, XXX: hostname, YYY: port
    # DB_URL=mongodb://UUU:PPP@XXX.mlab.com:YYY/issuetracker

    ## Server Port
    API_SERVER_PORT=3000
    ## Enable CORS (default: true)
    # ENABLE_CORS=false
    ```

### Running the API

Open a terminal in the `api` folder. Run `npm run start`.

To test queries, go to `'localhost:3000/graphql'` in your broswer to
open the Apollo playground.

## Running Scripts

To run the mongo scripts in `api/scripts`:

In the `api` folder, open a terminal. Run `mongosh scripts/<script_name>.js`.
For example, to run the `trymongo.js` script, run `mongosh scripts/trymongo.js`.

## NPM Script Notes

- Note: If developing on Windows, use the following line in
  all `.eslintrc` files to avoid CRLF errors:
```json
{
  ...
  "linebreak-style": [
    "error",
    "windows"
  ]
  ...
}
```
