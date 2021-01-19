export default (url) => ({
  elements: {
    comment: "textarea",
    postButton: "[data-test-id='post-comment-button']",
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

  selectTag(value) {
    cy.get(`[data-test-id='tag-${value}']`).click();
    return cy.get(`[data-test-id='tag-link-${value}']`);
  },
});
