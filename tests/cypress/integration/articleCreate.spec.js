import loginPageFactory from "../support/LoginPage";
import listPageFactory from "../support/ListPage";
import editPageFactory from "../support/EditPage";

describe("Article Create", () => {
  const LoginPage = loginPageFactory("/login");
  const ListPage = listPageFactory("/");
  const EditPage = editPageFactory("/editor");

  const articleValues = {
    title: "Test Article",
    description: "An article",
    body: "The body of the article",
    tagList: "boring new fresh",
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

  it("should create a new article", () => {
    EditPage.navigate();
    EditPage.fillForm(articleValues);
    EditPage.publish();
    ListPage.navigate();
    ListPage.goToGlobalFeed();
    ListPage.waitUntilRowIsVisible(articleValues.title);
  });

  after(() => {
    //cy.fixtures_reset();
  });
});
