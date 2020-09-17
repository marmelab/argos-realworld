export default (url) => ({
  elements: {
    globalFeed: "div.feed-toggle a.nav-link.active",
    addFilterButton: ".add-filter",
    appLoader: ".app-loader",
    displayedRecords: ".displayed-records",
    filter: (name) => `.filter-field[data-source='${name}'] input`,
    filterMenuItems: `.new-filter-item`,
    menuItems: "div[role=button]",
    submenuItems: `[role=menuitem]`,
    filterMenuItem: (source) => `.new-filter-item[data-key="${source}"]`,
    hideFilterButton: (source) =>
      `.filter-field[data-source="${source}"] .hide-filter`,
    nextPage: ".next-page",
    pageNumber: (n) => `.page-number[data-page='${n}']`,
    previousPage: ".previous-page",
    recordRows: ".datagrid-body tr",
    firstRecordRow: "tbody tr:nth-child(1)",
    nRecordRow: (n) => `tbody tr:nth-child(${n})`,
    viewsColumn: ".datagrid-body tr td:nth-child(6)",
    datagridHeaders: "th",
    title: "#react-admin-title",
    profile: 'button[title="Profile"]',
    logout: 'li[role="menuitem"]',
    bulkActionsButton: ".bulk-actions-button",
    customBulkActionsButtonMenuItem: ".bulk-actions-menu-item:first-child",
    deleteBulkActionsButtonMenuItem: ".bulk-actions-menu-item:last-child",
    selectAll: ".select-all",
    selectedItem: ".select-item input:checked",
    selectItem: ".select-item input",
    page: "div.list-page",
  },

  getPage() {
    return cy.get(this.elements.page);
  },

  navigate() {
    cy.visit(url);
    this.waitUntilDataLoaded();
  },

  waitUntilDataLoaded() {
    return cy.get(this.elements.globalFeed);
  },

  waitUntilRowsAreVisible() {
    return cy.get(this.elements.recordRows);
  },

  selectFirstRowEditLink() {
    // Force click for case where edit needs scrolling to be visible
    cy.get(`${this.elements.firstRecordRow} a`)
      .contains("Edit")
      .click({ force: true });
  },

  getFirstRow() {
    return cy.get(this.elements.firstRecordRow);
  },

  getRow(n) {
    return cy.get(this.elements.nRecordRow(n));
  },

  selectCreateButton() {
    cy.get(`${this.elements.page} a`).contains("Create").click({ force: true });
  },

  selectMenuItem(menuItem) {
    cy.get(this.elements.menuItems).contains(menuItem).click();
  },

  selectSubMenuItem(submenuItem) {
    cy.get(this.elements.submenuItems)
      .contains(submenuItem)
      .click({ force: true });
  },

  openFilters() {
    cy.get(this.elements.addFilterButton).click();
  },

  nextPage() {
    cy.get(this.elements.nextPage).click();
  },

  previousPage() {
    cy.get(this.elements.previousPage).click();
  },

  goToPage(n) {
    return cy.get(this.elements.pageNumber(n)).click();
  },

  setFilterValue(name, value, clearPreviousValue = true) {
    cy.get(this.elements.filter(name));
    if (clearPreviousValue) {
      cy.get(this.elements.filter(name)).clear();
    }
    if (value) {
      cy.get(this.elements.filter(name)).type(value);
    }
  },

  showFilter(name) {
    cy.get(this.elements.addFilterButton).click();

    cy.get(this.elements.filterMenuItem(name)).click();
  },

  hideFilter(name) {
    cy.get(this.elements.hideFilterButton(name)).click();
  },

  logout() {
    cy.get(this.elements.profile).click();
    cy.get(this.elements.logout).contains("Logout").click({ force: true });
  },

  toggleSelectAll() {
    cy.get(this.elements.selectAll).click();
  },

  toggleSelectSomeItems(count) {
    cy.get(this.elements.selectItem).then((els) => {
      for (let i = 0; i < count; i++) {
        els[i].click();
      }
    });
  },

  applyUpdateBulkAction() {
    cy.get(this.elements.bulkActionsButton).click();
    cy.get(this.elements.customBulkActionsButtonMenuItem).click();
  },

  applyDeleteBulkAction() {
    cy.get(this.elements.bulkActionsButton).click();
    cy.get(this.elements.deleteBulkActionsButtonMenuItem).click();
  },

  getRecordRows() {
    return cy.get(this.elements.recordRows);
  },

  contains(text) {
    return cy.get(this.elements.body).contains(text);
  },

  get(element) {
    return cy.get(`${this.elements.body} ${element}`);
  },

  waitForRefresh() {
    cy.get('button[title="Refresh"]', { timeout: 10000 });
  },
});
