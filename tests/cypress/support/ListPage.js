export default (url) => ({
  elements: {
    globalFeed: "[data-test-id='global-feed-link']",
  },

  navigate() {
    cy.visit("");
    this.waitUntilDataLoaded();
  },

  waitUntilDataLoaded() {
    return cy.get(this.elements.globalFeed);
  },

  goToGlobalFeed() {
    return cy.get(this.elements.globalFeed).click();
  },

  waitUntilRowIsVisible(rowTitle) {
    return cy.contains(rowTitle);
  },

  openArticleTitle(title) {
    return cy.contains(title).click();
  },
});
