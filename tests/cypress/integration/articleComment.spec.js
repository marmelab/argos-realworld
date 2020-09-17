import loginPageFactory from "../support/LoginPage";
import listPageFactory from "../support/ListPage";
import articlePageFactory from "../support/ArticlePage";

describe("Article Comment", () => {
  const LoginPage = loginPageFactory("/login");
  const ListPage = listPageFactory("/");
  const ArticlePage = articlePageFactory();

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

  it("should comment an article", () => {
    ListPage.navigate();
    ListPage.goToGlobalFeed();
    ListPage.openArticle(1);

    const commentText = "I didn't undertand anything";
    ArticlePage.comment(commentText);
    ArticlePage.waitUntilTextVisible(commentText);
  });

  afterEach(() => {
    LoginPage.logout();
  });

  after(() => {
    //cy.fixtures_reset();
  });
});
