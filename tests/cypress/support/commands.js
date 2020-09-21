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
import 'cypress-testing-library/add-commands';

Cypress.Commands.add('fixtures_reset', () => {
    cy.request({
        url: 'http://localhost:3001/test/reset-cypress', // assuming you've exposed a seeds route
        method: 'GET',
    }).its('body');
});

Cypress.Commands.add('fixtures_load', (type, data = {}) => {
    cy.request({
        url: `http://localhost:3001/test/${type}`,
        method: 'POST',
        body: data,
    }).then(response => {
        if (response.status !== 200) {
            throw Error(
                `Error during load fixture with ${response.status} status code`
            );
        }
        return response.body;
    });
});

Cypress.Screenshot.defaults({ timeout: 60000 });
