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

let savedTimestamp = null;
let savedStarted = null;
let savedTestTitle = null;

const setStart = (title) => {
    savedStarted = new Date();
    savedTestTitle = title;
};

Cypress.on('test:before:run', (attributes) => {
    // Fires before the test and all before and beforeEach hooks run.
    setStart(attributes.title);
});

const addPreviousTimestampToTimeline = () => {
    if (!savedTimestamp) {
        return;
    }

    const timestamp = savedTimestamp;
    savedTimestamp = null;
    // sends test results to the plugins process
    // using cy.task https://on.cypress.io/task
    cy.task('addToTimeline', timestamp);
};

beforeEach(addPreviousTimestampToTimeline);

const getTimestamp = (title) => {
    const ended = new Date();
    return {
        title,
        started: savedStarted,
        ended,
        elapsed: ended - savedStarted,
    };
};

const addTimestampToTimeline = (title) => {
    const timestamp = getTimestamp(title);
    cy.task('addToTimeline', timestamp);
};

after(() => addTimestampToTimeline(savedTestTitle));

Cypress.on('test:after:run', (attributes) => {
    // Fires after the test and all afterEach and after hooks run.
    // prepare timestamp to be added to timeline by upcoming addPreviousTimestampToTimeline
    // savedTimestamp = getTimestamp(attributes.title);
    savedTimestamp = getTimestamp(savedTestTitle);
});

// keep previous timestamp but change its name
Cypress.Commands.add('renameCurrentTimestamp', (title) => {
    savedTestTitle = title;
});

// do not save previous timestamp and start a new one
Cypress.Commands.add('overwriteTimestamp', (title) => {
    setStart(title);
});

// save previous timestamp and start a new one
Cypress.Commands.add('setTimestamp', (title) => {
    addTimestampToTimeline(savedTestTitle);
    setStart(title);
});
