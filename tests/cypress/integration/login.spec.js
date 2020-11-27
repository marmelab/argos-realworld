import loginPageFactory from '../support/LoginPage';

describe('Login', () => {
    const LoginPage = loginPageFactory('/login');

    beforeEach(() => {
        cy.resetFixtures();
    });

    it('should login', () => {
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn();
    });

    it('should logout', () => {
        LoginPage.logout();
        LoginPage.isLoggedOut();
    });

});
