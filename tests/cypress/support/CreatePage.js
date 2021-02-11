import filler from './FormFiller';

const formClass = 'create-page';

export default (url) => ({
    elements: {
        body: 'body',
        submitButton: `.${formClass} button[type='submit']`,
    },

    navigate() {
        cy.visit(url);
    },

    waitUntilVisible() {
        cy.get(this.elements.submitButton);
    },

    submit() {
        cy.get(this.elements.submitButton).click();
    },

    submitNoNotify() {
        cy.get(this.elements.submitButton)
            .contains(/^Save$/)
            .click();
    },

    ...filler(formClass),
});
