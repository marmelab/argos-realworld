import loginPageFactory from '../support/LoginPage';

describe('Login', () => {
    const LoginPage = loginPageFactory('/login');

    it('should login/logout', () => {
        LoginPage.navigate();
        LoginPage.login();
        LoginPage.isLoggedIn()
        LoginPage.logout();
        LoginPage.isLoggedOut();
    });

});
