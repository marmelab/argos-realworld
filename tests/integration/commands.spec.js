/// <reference types="cypress" />

context("Commands", () => {
  beforeEach(() => {
    cy.visit("/#/commands");
    // wait till datagrid loads its rows
    cy.contains("1-25 of 400", { timeout: 40000 }).should("exist");
    // then wait until no more progress bars show on reference fields, can be very long
    cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "not.exist"
    );
  });

  it("should navigate on commands list", () => {
    cy.contains("Next").click({ force: true });
     cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "exist"
    );
    cy.contains("26-50 of 400").should("exist");
    cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "not.exist"
    );
    cy.contains("Next").click({ force: true });
     cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "exist"
    );
    cy.contains("51-75 of 400").should("exist");
    cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "not.exist"
    );
    cy.contains("Next").click({ force: true });
     cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "exist"
    );
    cy.contains("76-100 of 400").should("exist");
    cy.get(".MuiLinearProgress-bar1Indeterminate", { timeout: 120000 }).should(
      "not.exist"
    );
  });
});
