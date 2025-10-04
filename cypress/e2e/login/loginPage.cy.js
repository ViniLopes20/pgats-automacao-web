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
import errorMessage from "../../fixtures/errorMessage.json";

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

    viewErrorMessage(errorMessage.credentialInvalid);
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

    createNewAccount(uniqueName, uniqueEmail, password);

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

    viewErrorMessage(errorMessage.credentialAlreadyInUse);
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
