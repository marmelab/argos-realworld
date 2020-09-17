export default (url) => ({
  elements: {
    input: {
      title: `input[type='text'][placeholder="Article Title"]`,
      description: `input[type='text'][placeholder="What's this article about?"]`,
      body: "textarea",
      tagList: `input[type='text'][placeholder="Enter tags"]`,
    },
    publishButton: `form button.btn-primary[type='button']`,
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    return cy.get(this.elements.publishButton);
  },

  getInputValue(name) {
    return cy.get(this.elements.input[name]);
  },

  clickInput(name) {
    cy.get(this.elements.input[name]).click();
  },

  fillForm(values) {
    Object.keys(values).map((key) => {
      const value = values[key];
      cy.get(this.elements.input[key]).type(value);
      return value;
    });
  },

  publish() {
    cy.get(this.elements.publishButton).click();
  },
});
