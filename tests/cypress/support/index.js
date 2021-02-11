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

let savedMilestone = null;
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

const addPreviousMilestoneToTimeline = () => {
    if (!savedMilestone) {
        return;
    }

    const milestone = savedMilestone;
    savedMilestone = null;
    // sends test results to the plugins process
    // using cy.task https://on.cypress.io/task
    cy.task('addToTimeline', milestone);
};

beforeEach(addPreviousMilestoneToTimeline);

const getMilestone = (title) => {
    const ended = new Date();
    return {
        title,
        started: savedStarted,
        ended,
        elapsed: ended - savedStarted,
    };
};

const addMilestoneToTimeline = (title) => {
    const milestone = getMilestone(title);
    cy.task('addToTimeline', milestone);
};

after(() => addMilestoneToTimeline(savedTestTitle));

Cypress.on('test:after:run', (attributes) => {
    // Fires after the test and all afterEach and after hooks run.
    // prepare milestone to be added to timeline by upcoming addPreviousMilestoneToTimeline
    // savedMilestone = getMilestone(attributes.title);
    savedMilestone = getMilestone(savedTestTitle);
});

// keep previous milestone but change its name
Cypress.Commands.add('renameCurrentMilestone', (title) => {
    savedTestTitle = title;
});

// do not save previous milestone and start a new one
Cypress.Commands.add('moveCurrentMilestone', (title) => {
    setStart(title ? title : savedTestTitle);
});

// save previous milestone and start a new one
Cypress.Commands.add('createNewMilestone', (title) => {
    addMilestoneToTimeline(savedTestTitle);
    setStart(title);
});
