export default (url) => ({
  elements: {
    globalFeed: "div.feed-toggle li.nav-item:last-child a.nav-link",
    article: (index) => `div.article-preview:nth-child(${index + 1}) > a`,
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

  openArticle(index) {
    return cy.get(this.elements.article(index)).click();
  },
});
