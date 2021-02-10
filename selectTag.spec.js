import loginPageFactory from './tests/cypress/support/LoginPage';
import listPageFactory from './tests/cypress/support/ListPage';
import articlePageFactory from './tests/cypress/support/ArticlePage';


describe('Select tags', () => {
    const LoginPage = loginPageFactory('/login');
    const ListPage = listPageFactory('/');
    const ArticlePage = articlePageFactory();

    beforeEach(() => {
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn();
    });

    it('should select a tag', () => {
        ListPage.navigate();
        ListPage.goToGlobalFeed();
        ArticlePage.selectTag("conference");
        ArticlePage.selectTag("database");
        ArticlePage.selectTag("devops");
        ArticlePage.selectTag("linux");
        ArticlePage.selectTag("marmelab");
        ArticlePage.selectTag("react");
        ArticlePage.selectTag("reference");
        ArticlePage.selectTag("tech4good");
        ArticlePage.selectTag("tutorial");
        ArticlePage.selectTag("vuejs");
        ArticlePage.selectTag("welcome");
    });

    afterEach(() => {
        LoginPage.logout();
    });
});
