import loginPageFactory from "../support/LoginPage";

describe("Login", () => {
  const LoginPage = loginPageFactory("/login");

  it("should login", () => {
    LoginPage.navigate();
    LoginPage.login();
    LoginPage.isLoggedIn();
  });

  it("should logout", () => {
    LoginPage.logout();
    LoginPage.isLoggedOut();
  });
});
