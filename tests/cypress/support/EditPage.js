import filler from './FormFiller';

const formClass = 'edit-page';

export default url => ({
    elements: {
        body: 'body',
        input: (name, type = 'input') =>
            `.${formClass} ${type}[name='${name}']`,
        tabs: `.form-tab`,
        submitButton: `.${formClass} button[type='submit']`,
        tab: index => `.form-tab:nth-of-type(${index})`,
        title: '#react-admin-title',
    },

    navigate() {
        cy.visit(url);
        this.waitUntilTitleIsVisible();
    },

    waitUntilTitleIsVisible() {
        return cy.get(this.elements.title);
    },

    waitUntilDataLoaded() {
        return cy.get(this.elements.appLoader);
    },

    getInputValue(name) {
        return cy.get(this.elements.input(name));
    },

    clickInput(name) {
        cy.get(this.elements.input(name)).click();
    },

    gotoTab(index) {
        cy.get(this.elements.tab(index)).click();
    },

    gotoTabName(name) {
        cy.get(this.elements.tabs)
            .contains(name)
            .click();
    },

    submit() {
        cy.get(this.elements.submitButton)
            .first()
            .click();
    },

    clickButton(text) {
        cy.get(`.${formClass}`)
            .contains(text)
            .first()
            .click();
    },

    selectListButton() {
        return cy
            .get('a')
            .contains('List')
            .click();
    },

    ...filler(formClass),
});
