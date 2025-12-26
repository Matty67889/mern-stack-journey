# Mern Stack Journey

Applications I'm building to learn the MERN stack.

## Issue Tracker Specifications

- The user should be able to view a list of issues, with an
  ability to filter the list by various parameters.
- The user should be able to add new issues, by supplying the
  initial values of the issue’s fields.
- The user should be able to edit and update an issue by changing
  its field values.
- The user should be able delete an issue.

An issue should have following attributes:

- A title that summarizes the issue (freeform long text)
- An owner to whom the issue is assigned (freeform short text)
- A status indicator (a list of possible status values)
- Creation date (a date, automatically assigned)
- Effort required to address the issue (number of days, a number)
- Estimated completion date or due date (a date, optional)

## Getting Started

### Running local MongoDB Server

If running a local MongoDB Server, make sure that the server is
running before moving on to any other step. For windows, this
can be checked in the "Services" application
(open Windows search and type "Services"). Check
for the MongoDB Server service.

### Running Issue Tracker

To run the issue tracker application:

1. In the `api` folder, create a file named `.env`, that looks
   something like the following. Values can be adjusted based on
   where the backend is being hosted.

    ```bash
    ## DB

    # Local
    DB_URL='mongodb://localhost/issuetracker'

    # Atlas - replace UUU: user, PPP: password, XXX: hostname
    # DB_URL=mongodb+srv://UUU:PPP@XXX.mongodb.net/issuetracker?retryWrites=true

    # mLab - replace UUU: user, PPP: password, XXX: hostname, YYY: port
    # DB_URL=mongodb://UUU:PPP@XXX.mlab.com:YYY/issuetracker

    ## Server Port
    API_SERVER_PORT=3000
    ```

2. In the `ui`, create a file named `.env`, that looks something
   like the following. Values can be adjusted based on where the
   frontend is being hosted.

    ```bash
    UI_SERVER_PORT=8000
    UI_API_ENDPOINT='http://localhost:3000/graphql' #link to backend queries
    ```

3. In the `ui` folder, open two separate terminals. Run `npm start`
   in one, and `npm run watch` in the other.
   - Note: If you choose not to watch `npm watch`, you will have to
     run `npm run compile` everytime you make changes to `App.jsx` to
     confirm that the changes are compiled to JavaScript.
4. In the `api` folder, open one terminal. Run `npm start`.
5. Type `'localhost:3000/graphql'` in your broswer to open the
   Apollo playground, and `'localhost:8000'` to open the issue tracker application.

### Running Scripts

To run the mongo scripts in `api/scripts`:

In the `api` folder, open a terminal. Run `node scripts/<script_name>.js`.
For example, to run the `trymongo.js` script, run `node scripts/trymongo.js`.

## Developer Notes

### Workflow

1. Run the issue tracker using the instructions in
   [Running Issue Tracker Section](#running-issue-tracker)
2. Edit code.
3. Run `npm run lint` and fix linting errors.
4. Run `npm run compile` to compile a production version of the
   app, and test to ensure that it works.

### NPM Script Notes

#### UI

- start: Starts app.
- lint: Runs linter for code.
- compile: Compiles and bundles app for production.
  - Use for compiling builds for production.
- watch: Starts process that watches for changes, and compiles and
  bundles app when a change is detected.
  - Use for automatic re-compiles when code is changed during development.

#### API

- start: Starts app.
- lint: Runs linter for code.
- test: Script for running a test of app.
