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
- open `http://localhost:8080`

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
