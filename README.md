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
