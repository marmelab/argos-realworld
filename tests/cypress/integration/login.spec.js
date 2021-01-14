import loginPageFactory from '../support/LoginPage';

describe('Login', () => {
    const LoginPage = loginPageFactory('/login');

    beforeEach(() => {
        cy.resetFixtures();
    });

    it('should login/logout', () => {
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn()
        LoginPage.logout();
        LoginPage.isLoggedOut();
    });

});
