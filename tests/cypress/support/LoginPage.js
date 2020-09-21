export default (url) => ({
  elements: {
    email: "input[type='email']",
    password: "input[type='password']",
    submitButton: "button[type='submit']",
    settingsButton: "a[href='/settings']",
    logoutButton: "button.btn-outline-danger",
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    cy.get(this.elements.submitButton);
  },

  login(email = "florian@marmelab.com", password = "1234") {
    cy.get(this.elements.email).type(email);
    cy.get(this.elements.password).type(password);
    cy.get(this.elements.submitButton).click();
  },

  isLoggedIn() {
    cy.get(this.elements.settingsButton);
  },

  logout() {
    cy.get(this.elements.settingsButton).click();
    cy.get(this.elements.logoutButton).click();
  },

  isLoggedOut() {
    cy.get(this.elements.settingsButton).should("not.visible");
  },
});
