# MERN Stack Journey Project API

Frontend for the MERN Stack Joruney project.

Jump to the [Getting Started](#getting-started) section
to launch the frontend for the application.

## Technologies Used

### Application Tools

- `React`
- `React Bootstrap`
- `Express`

### Dev Tools

- `Eslint`
- `Webpack`

## NPM Scripts

- `start`: Starts app.
- `lint`: Runs linter for code.
- `compile`: Compiles and bundles app for production.
  - Use for compiling builds for production.
- `watch`: Starts process that watches for changes, and compiles and
  bundles app when a change is detected.
  - Use for automatic re-compiles when code is changed during development.

## Getting Started

To run the frontend, follow these steps:

1. Set up a `.env` file.
2. Start the frontend server.

### Setting up an env file

In the `ui`, create a file named `.env`, that looks something
like the following. Values can be adjusted based on where the
frontend is being hosted.

```bash
UI_SERVER_PORT=8000
UI_API_ENDPOINT='http://localhost:3000/graphql'
# UI_SERVER_API_ENDPOINT='http://localhost:3000/graphql'
# API_PROXY_TARGET='http://localhost:3000'

# enables (or disables) hot module reload
ENABLE_HMR=true
```

### Running the Frontend Server

The issue tracker application can be run in three ways.
Start by opening a terminal in the `ui` folder. Then, do the following:

- production mode
  - Run `npm start`.
- development mode no hot module reload (HMR)
  1. Set `ENABLE_HMR=false` in the `ui` folder `.env` file.
  2. In the `ui` folder, run `npm run dev-all`.
     Alternatively, in the `ui` folder, open two terminals. Run
     `npm run watch-server-hmr` in one, and `npm run start` in the other.
- development mode HMR
  1. Set `ENABLE_HMR=true` in the `ui` folder `.env` file.
  2. In the `ui` folder, open a terminal. Run `npm run start`.

Navigate to `localhost:8000` to see the frontend of the application.


## NPM Script Notes

- Note: If developing on Windows, use the following line in
  all `.eslintrc` files to avoid CRLF errors:
```json
"linebreak-style": [
  "error",
  "windows"
]
```
