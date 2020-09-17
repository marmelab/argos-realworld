export default (url) => ({
  elements: {
    comment: "textarea",
    postButton: `form button.btn-primary[type='submit']`,
  },

  navigate() {
    cy.visit(url);
    this.waitUntilVisible();
  },

  waitUntilVisible() {
    return cy.get(this.elements.globalFeed);
  },

  comment(value) {
    cy.get(this.elements.comment).type(value);
    return cy.get(this.elements.postButton).click();
  },

  waitUntilTextVisible(text) {
    return cy.contains(text);
  },
});
