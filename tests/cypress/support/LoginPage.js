export default (url) => ({
  elements: {
    username: "input[type='email']",
    password: "input[type='password']",
    submitButton: "button[type='submit']",
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    cy.get(this.elements.username);
  },

  login(username = "florian", password = "1234") {
    cy.get(this.elements.username).type(username);
    cy.get(this.elements.password).type(password);
    cy.get(this.elements.submitButton).click();
  },
});
