# argos-realworld
App on docker to test and demo argos (based on realworld repos)

https://github.com/gothinkster/realworld

App 1 is : React/Redux and Node/Express

- https://github.com/gothinkster/react-redux-realworld-example-app
- https://github.com/gothinkster/node-express-realworld-example-app

App 2 is : Vanilla-JS-Web-Components and Node/Express

- https://github.com/gothinkster/web-components-realworld-example-app
- https://github.com/gothinkster/node-express-realworld-example-app

## To Install:

- make install

## To run project

- make start
- App1: open `http://localhost:4100`
- App2: open `http://localhost:8080`

## To create a production build:

- make build


## To run e2e tests (with a dockerized version of Cypress)

Setup dockerized environment

- make setup-tests

Then run automated tests

- make run-test

## To run e2e tests (whith Cypress running on the host machine, and opening a browser)

- make setup-tests
- make test-open

## Configuration
# React-Redux
- run-test
  - modify `cypress.json` such that `"baseUrl": "http://client:4100/",`
  - modify `command.js` such that `const mongoURL = "mongodb://mongo:27027/conduit";`
- test-open-test
  - modify `cypress.json` such that `"baseUrl": "http://localhost:4100/",`
  - modify `command.js` such that `const mongoURL = "mongodb://localhost:27027/conduit";`
# Vanilla-JS-Web-Components
- run-test
  - modify `cypress.json` such that `"baseUrl": "http://client:4100/",`
  - modify `command.js` such that `const mongoURL = "mongodb://mongo:27027/conduit";`
  - modify `config.js` such that `rest_url: "http://api:4000/api/"`
- test-open-test
  - modify `tests/cypress.json` such that `"baseUrl": "http://localhost:8080/",`
  - modify `tests/cypress/command.js` such that `const mongoURL = "mongodb://localhost:27027/conduit";`
  - modify `client/app/config.js` such that `rest_url: "http://localhost:4000/api/"`
