/// <reference types="cypress" />

context("Customers", () => {
  beforeEach(() => {
    cy.visit("/#/customers");
    cy.contains("Customers", { timeout: 20000 }).should("exist");
  });

  it("should navigate on customers list", () => {
    cy.contains("Next").click();
    cy.contains("26-50 of 100", { timeout: 120000 }).should("exist");
    cy.contains("Next").click();
    cy.contains("51-75 of 100", { timeout: 120000 }).should("exist");
    cy.contains("Next").click();
    cy.contains("76-100 of 100", { timeout: 120000 }).should("exist");
  });

  it("should create a customer", () => {
    cy.contains("1-25 of 100", { timeout: 120000 }).should("exist");

    cy.contains("Create", { timeout: 120000 }).click({ force: true });

    cy.contains("First name", { timeout: 120000 }).parent().find("input").type("Peter");
    cy.contains("Last name").parent().find("input").type("Mac Calloway");
    cy.contains("Email")
      .parent()
      .find("input")
      .type("peter.mac-calloway@force.pure");
    cy.contains("Birthday").parent().find("input").type("1968-12-08");
    cy.contains("Address")
      .parent()
      .find("textarea[aria-invalid=false]")
      .type("1337 rue de la forme");
    cy.contains("Zipcode").parent().find("input").type("92200");
    cy.contains("City").parent().find("input").type("Neuilly sur Seine");
    cy.contains("Password").parent().find("input").type("f0rce pUr3");
    cy.contains("Confirm password").parent().find("input").type("f0rce pUr3");

    cy.contains("Save").click({ force: true });

    cy.contains("Element created", { timeout: 120000 }).should("exist");

    cy.visit("/#/customers");
    cy.contains("1-25 of 101", { timeout: 120000 }).should("exist");
  });
});
