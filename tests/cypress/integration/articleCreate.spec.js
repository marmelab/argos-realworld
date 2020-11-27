import loginPageFactory from '../support/LoginPage';
import listPageFactory from '../support/ListPage';
import editPageFactory from '../support/EditPage';


describe('Article Create', () => {
    const LoginPage = loginPageFactory('/login');
    const ListPage = listPageFactory('/');
    const EditPage = editPageFactory('/editor');

    const articleValues = {
        title: 'Test Article',
        description: 'An article',
        body: 'The body of the article',
        tagList: 'boring new fresh',
    };

    beforeEach(() => {
        cy.resetFixtures();
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn();
    });

    it('should create a new article', () => {
        EditPage.navigate();
        EditPage.fillForm(articleValues);
        EditPage.publish();
        ListPage.navigate();
        ListPage.goToGlobalFeed();
        ListPage.waitUntilRowIsVisible(articleValues.title);
    });

    afterEach(() => {
        LoginPage.logout();
    });
});
