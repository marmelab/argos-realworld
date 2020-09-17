export default (url) => ({
  elements: {
    globalFeed: "div.feed-toggle li.nav-item:last-child a.nav-link",
  },

  navigate() {
    cy.visit(url);
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
});
