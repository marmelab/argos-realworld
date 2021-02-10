// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

let testAttributes = null;
let started = null;
let title = null;

Cypress.on('test:before:run', (attributes) => {
    // Fires before the test and all before and beforeEach hooks run.
    started = new Date();
    title = attributes.title;
});

const addPreviousTimestampToTimeline = () => {
    if (!testAttributes) {
        return;
    }

    const attr = testAttributes;
    testAttributes = null;
    // sends test results to the plugins process
    // using cy.task https://on.cypress.io/task
    cy.task('addToTimeline', attr);
};

beforeEach(addPreviousTimestampToTimeline);

const addFinalTimestampOfTest = () => {
    const ended = new Date();
    testAttributes = {
        title,
        started,
        ended,
        elapsed: ended - started,
    };
    cy.task('addToTimeline', testAttributes);
};
after(addFinalTimestampOfTest);

Cypress.on('test:after:run', (attributes) => {
    // Fires after the test and all afterEach and after hooks run.
    // prepare timestamp to be added to timeline by upcoming addPreviousTimestampToTimeline
    const ended = new Date();
    testAttributes = {
        title: attributes.title,
        started,
        ended,
        elapsed: ended - started,
    };
});
