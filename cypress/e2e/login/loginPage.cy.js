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
import {
  createUserViaAPI,
  deleteUserViaAPI,
} from "../../api/userMenagmentAPI.js";
import errorMessage from "../../fixtures/errorMessage.json";

const Chance = require("chance");
const chance = new Chance();

const userData = {
  name: chance.name(),
  email: chance.email(),
  password: chance.hash(),
};

beforeEach(() => {
  createUserViaAPI(userData);

  launchCommercePlatform();
});

describe("Tests Cases related to Login", () => {
  it("TC02 - Check that is possible to log in with valid credentials", () => {
    login(userData.email, userData.password);

    viewLogoutButtonPresent();
  });
  it("TC03 - Check that is not possible to log in with invalid credentials", () => {
    login(userData.email, "wrongpassword");

    viewErrorMessage(errorMessage.credentialInvalid);
    viewUserIconNotPresent();
    viewLogoutButtonNotPresent();
  });
  it("TC04 - Check that is possible to logout", () => {
    login(userData.email, userData.password);

    logout();

    assertUrlContainsPath("/login");
    cy.get('input[data-qa="login-email"]').should("be.visible");
    viewUserIconNotPresent();
    viewLogoutButtonNotPresent();
  });
});
describe("Tests Cases related to Register User", () => {
  it("TC01 - Check that is possible to create a new user", () => {
    const uniqueEmail = chance.email();
    const uniqueName = chance.name();
    const password = chance.hash();

    createNewAccount(uniqueName, uniqueEmail, password);

    assertUrlContainsPath("account_created");
    cy.get('h2[data-qa="account-created"]').contains("Account Created!");
    cy.get('a[data-qa="continue-button"]').click();

    logout();
    moveToLoginPage();

    login(uniqueEmail, password);

    viewLogoutButtonPresent();
  });

  it("TC05 - Check that is not possible to create a new user with existing email", () => {
    const uniqueName = chance.name();
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
