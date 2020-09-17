import listPageFactory from "../support/ListPage";
import loginPageFactory from "../support/LoginPage";

describe("Article Create", () => {
  const ListPage = listPageFactory("/");
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

  const inputValues = [
    {
      type: "textarea",
      name: "title",
      value: "New title",
    },
  ];

  it("should open an article", () => {
    ListPage.navigate();
  });

  after(() => {
    //cy.fixtures_reset();
  });
});
