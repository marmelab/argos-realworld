export default (url) => ({
  elements: {
    email: "input[type='email']",
    password: "input[type='password']",
    signinMenu: "[data-test-id='signin-menu']",
    settingsMenu: "[data-test-id='settings-menu']",
    signinButton: "[data-test-id='signin-button']",
    logoutButton: "[data-test-id='logout-button']",
  },

  navigate() {
    cy.visit('');
    cy.get(this.elements.signinMenu).click();
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    cy.get(this.elements.signinButton);
  },

  login(email = "florian@marmelab.com", password = "1234") {
    cy.get(this.elements.email).type(email);
    cy.get(this.elements.password).type(password);
    cy.get(this.elements.signinButton).click();
  },

  isLoggedIn() {
    cy.get(this.elements.settingsMenu);
  },

  logout() {
    cy.get(this.elements.settingsMenu).click();
    cy.get(this.elements.logoutButton).click();
  },

  isLoggedOut() {
    cy.get(this.elements.settingsMenu).should("not.visible");
  },
});
