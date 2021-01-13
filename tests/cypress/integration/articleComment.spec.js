import loginPageFactory from '../support/LoginPage';
import listPageFactory from '../support/ListPage';
import articlePageFactory from '../support/ArticlePage';

describe('Article Comment', () => {
    const LoginPage = loginPageFactory('/login');
    const ListPage = listPageFactory('/');
    const ArticlePage = articlePageFactory();

    beforeEach(() => {
        cy.resetFixtures();
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn();
    });

    it('should comment an article', () => {
        ListPage.navigate();
        ListPage.goToGlobalFeed();
        ListPage.openArticleTitle("Au secours, mon poste ne démarre plus !")

        const commentText = "I didn't undertand anything";
        ArticlePage.comment(commentText);
        ArticlePage.waitUntilTextVisible(commentText);
    });

    afterEach(() => {
        LoginPage.logout();
    });
});
