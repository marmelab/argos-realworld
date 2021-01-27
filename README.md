# argos-realworld

This repository stores several versions of the database, API and client of [the realworld app](https://github.com/gothinkster/realworld), for digital footprint measurements. 

## Included Versions

We've cloned and tweaked implementations of the realworld frontend and backend apps, so that they can work together and produce the exact same results (and pass the same tests).

You can use either one of the server implementations with either one of the frontend implementation.

### Backend

- `rails`: based on https://github.com/gothinkster/rails-realworld-example-app, contains a SQLite DB
- `node-express`: based https://github.com/gothinkster/node-express-realworld-example-app, contains a MongoDB DB

### Frontend

- `react-redux`: based on https://github.com/gothinkster/react-redux-realworld-example-app
- `vanilla-js-web-components`: based on https://github.com/gothinkster/web-components-realworld-example-app

## Requirements

Node, Docker

## Installation

Choose a frontend and a backend, pass them as `API_DIR` and `CLIENT_DIR` environment variables, and call `make install`. For instance:

```sh
API_DIR=node-express CLIENT_DIR=react-redux make install
```

## Starting The App

Choose a frontend and a backend, pass them as `API_DIR` and `CLIENT_DIR` environment variables, and call `make start`. For instance:

```sh
API_DIR=node-express CLIENT_DIR=react-redux make start
```

- open `http://localhost:8080`
- for authenticated pages, use florian@marmelab.com / 1234

## To run e2e tests (with Cypress running on the host machine, and opening a browser)

- make start
- make restore
- make test-open

## To run e2e tests (with a dockerized version of Cypress)

Setup dockerized environment

- make setup-tests

Then run automated tests

- make run-test

## Notes for dev

- in order to add a new front you should decorate html elements with `data-test-id`:
  - `home-menu`
  - `new-post-menu`
  - `signin-menu`
  - `settings-menu`
  - `publish-button`
  - `post-comment-button`
  - `signin-button`
  - `logout-button`
  - `global-feed-link`
- modify code such that API root takes value `process.env.REACT_APP_API_ROOT || "http://localhost:4000/api`
  (`process.env.REACT_APP_API_ROOT` when tests are run in Docker)
- front PORT should be 8080
