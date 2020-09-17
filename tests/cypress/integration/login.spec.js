import loginPageFactory from "../support/LoginPage";

describe("Login", () => {
  const LoginPage = loginPageFactory("/login");

  before(() => {
    /*cy.fixtures_reset();
    cy.fixtures_load("investor", investorValues).then(({ id: investor_id }) =>
      cy.fixtures_load("idea", {
        ...articleValues,
        lead_id: investor_id,
      })
    );*/
  });

  it("should login", () => {
    LoginPage.navigate();
    LoginPage.login();
    LoginPage.isLoggedIn();
  });

  it("should logout", () => {
    LoginPage.logout();
    LoginPage.isLoggedOut();
  });

  after(() => {
    //cy.fixtures_reset();
  });
});
