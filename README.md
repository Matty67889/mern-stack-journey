# Mern Stack Journey

Applications I'm building to learn the MERN stack.

> **SECURITY WARNING**: This repository does not use the most
> updated React packages. Use at your own risk.

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

Run the backend and the frontend end using their
associated `README`s. Additionally, make sure you
have a MongoDB Server running (instructions included on backend instructions).

## Workflow (for devs)

1. Run the issue tracker using the instructions in
   [Running Issue Tracker Section](#running-issue-tracker)
2. Edit code.
3. Run `npm run lint` and fix linting errors for `ui` and `api` folders.
4. Run `npm run compile` in the `ui` folder to compile a
   production version of the app, and test to ensure that it works.

## NPM Script Notes

- Note: If developing on Windows, use the following line in
  all `.eslintrc` files to avoid CRLF errors:
```json
"linebreak-style": [
  "error",
  "windows"
]
```

## Debugging

- If the page loads and the functionality works but
  the styles do not appear to load, remember that
  there is a symbolic link in the `ui/public` folder.
  Make sure to recreate that symbolic link when moving
  the project from one system to another. Also, double
  check that the `.env` files are configured correctly.
- If the backend cannot load data, double check that
  the `.env` file is correct for the backend, namely
  the `DB_URL` variable. It changes depending on how
  you're running your MongoDB server.
