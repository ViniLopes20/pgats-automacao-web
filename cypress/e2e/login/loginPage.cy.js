/// <reference types="cypress" />

import {
  createNewAccount,
  fillSignupForm,
  login,
  logout,
  userListToDelete,
  viewErrorMessage,
} from "../../pages/login/loginPage.js";
import { assertUrlContainsPath } from "../../pages/utils/general.js";
import {
  viewLogoutButtonNotPresent,
  viewLogoutButtonPresent,
  viewUserIconNotPresent,
} from "../../pages/utils/navBarMenu.js";
import {
  launchCommercePlatform,
  moveToLoginPage,
} from "../../pages/utils/navigation.js";
import { createUserViaAPI, deleteUserViaAPI } from "../api/userMenagmentAPI.js";

const timestamp = new Date().getTime();
const userData = {
  name: `Automation User ${timestamp}`,
  email: `automation+${timestamp}@test.com`,
  password: timestamp,
};

beforeEach(() => {
  createUserViaAPI(userData);

  launchCommercePlatform();
});

describe("Tests Cases related to Login", () => {
  it("Check that is possible to log in with valid credentials", () => {
    login(userData.email, userData.password);

    viewLogoutButtonPresent();
  });
  it("Check that is not possible to log in with invalid credentials", () => {
    login(userData.email, "wrongpassword");

    viewErrorMessage("Your email or password is incorrect!");
    viewUserIconNotPresent();
    viewLogoutButtonNotPresent();
  });
  it("Check that is possible to logout", () => {
    login(userData.email, userData.password);

    logout();

    assertUrlContainsPath("/login");
    cy.get('input[data-qa="login-email"]').should("be.visible");
    viewUserIconNotPresent();
    viewLogoutButtonNotPresent();
  });
});
describe("Tests Cases related to Register User", () => {
  it("Check that is possible to create a new user", () => {
    const timestamp = new Date().getTime();
    const uniqueEmail = `vini2.lopes+${timestamp}@test.com.br`;
    const uniqueName = `Vini Teste ${timestamp}`;
    const password = timestamp;

    createNewAccount(
      uniqueName,
      uniqueEmail,
      password,
      "9",
      "June",
      "1964",
      "Vini",
      "Test 2",
      "Test Company",
      "Automation 123",
      "Test 123",
      "Canada",
      "Test State",
      "Test City",
      "50764899",
      "89976547372",
      "Mr"
    );

    assertUrlContainsPath("account_created");
    cy.get('h2[data-qa="account-created"]').contains("Account Created!");
    cy.get('a[data-qa="continue-button"]').click();

    logout();
    moveToLoginPage();

    login(uniqueEmail, password);

    viewLogoutButtonPresent();
  });

  it("Check that is not possible to create a new user with existing email", () => {
    const timestamp = new Date().getTime();
    const uniqueName = `Vini Teste ${timestamp}`;
    const existingEmail = userData.email;

    moveToLoginPage();

    fillSignupForm(uniqueName, existingEmail);

    viewErrorMessage("Email Address already exist!");
  });
});

afterEach(() => {
  if (userListToDelete?.length) {
    for (const user of userListToDelete) {
      deleteUserViaAPI(user.email, user.password);
    }
    userListToDelete.length = 0;
  }
});
