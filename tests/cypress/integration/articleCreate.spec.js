import loginPageFactory from "../support/LoginPage";
import listPageFactory from "../support/ListPage";
import editPageFactory from "../support/EditPage";

describe("Article Create", () => {
  const LoginPage = loginPageFactory("/login");
  const ListPage = listPageFactory("/");
  const EditPage = editPageFactory("/editor");

  const investorValues = {
    first_name: "Florian",
    login: "1234",
    email: "florian@marmelab.com",
  };
  const articleValues = {
    title: "Test Article",
    conviction: 2,
  };

  before(() => {
    /*cy.fixtures_reset();
    cy.fixtures_load("investor", investorValues).then(({ id: investor_id }) =>
      cy.fixtures_load("idea", {
        ...articleValues,
        lead_id: investor_id,
      })
    );*/
  });

  beforeEach(() => {
    LoginPage.navigate();
    LoginPage.login();
    LoginPage.isLoggedIn();
  });

  const inputValues = [
    {
      type: "textarea",
      name: "title",
      value: "New title",
    },
  ];

  it("should create a new article", () => {
    EditPage.navigate();
    /*ListPage.waitUntilTitleIsVisible().contains("Ideas");
    ListPage.waitUntilRowsAreVisible();
    ListPage.getFirstRow().contains(articleValues.title);*/
  });

  /*it("should edit the first suggestion", () => {
    ListPage.waitUntilTitleIsVisible();
    ListPage.waitUntilRowsAreVisible();
    ListPage.selectFirstRowEditLink();

    const EditPage = editPageFactory(cy.url());
    EditPage.waitUntilTitleIsVisible();
    EditPage.setValues(inputValues);
    EditPage.submit();

    ListPage.waitUntilTitleIsVisible();
    ListPage.waitUntilRowsAreVisible();
    ListPage.getFirstRow().contains(inputValues[0].value);
  });*/

  after(() => {
    //cy.fixtures_reset();
  });
});
