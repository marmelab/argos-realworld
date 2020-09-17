import filler from "./FormFiller";

const formClass = "btn-primary";

export default (url) => ({
  elements: {
    title: "",
    description: "body",
    body: (name, type = "input") => `.${formClass} ${type}[name='${name}']`,
    tagList: `.form-tab`,
    publishButton: `form button[type='button']`,
    tab: (index) => `.form-tab:nth-of-type(${index})`,
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    return cy.get(this.elements.publishButton);
  },

  getInputValue(name) {
    return cy.get(this.elements.input(name));
  },

  clickInput(name) {
    cy.get(this.elements.input(name)).click();
  },

  publish() {
    cy.get(this.elements.publishButton).first().click();
  },

  ...filler(formClass),
});
