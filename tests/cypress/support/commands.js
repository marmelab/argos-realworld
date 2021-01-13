// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-testing-library/add-commands";

/** Empty database and import default fixtures */
Cypress.Commands.add("resetFixtures", () => {
    const mongoURL = "mongodb://mongo:27027/conduit"; // when running `make run-test`
    // const mongoURL = "mongodb://localhost:27027/conduit"; // when running `make test-open`

  return cy
    .exec(
      `mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})' ${mongoURL} && mongorestore --gzip --archive=data/dump.zip --uri ${mongoURL}`
    )
    .then(({ code, stderr }) => {
      if (code && stderr) {
        cy.task("error", { command: "resetFixtures", code, stderr });
      }
    });
});

Cypress.Screenshot.defaults({ timeout: 60000 });
