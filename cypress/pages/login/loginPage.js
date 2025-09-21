/// <reference types="cypress"/>

import { moveToLoginPage } from "../utils/navigation.js";

export let userListToDelete = [];

export function createNewAccount(
  name,
  email,
  password,
  bornDay,
  bornMonth,
  bornYear,
  firstName,
  lastName,
  company,
  address1,
  address2,
  country,
  state,
  city,
  zipcode,
  mobileNumber,
  gender
) {
  moveToLoginPage();

  fillSignupForm(name, email);

  cy.get('input[type="radio"]').check(gender);
  cy.get("input#newsletter").check();
  cy.get("input#optin").check();

  cy.get('select[data-qa="days"]').select(bornDay);
  cy.get('select[data-qa="months"]').select(bornMonth);
  cy.get('select[data-qa="years"]').select(bornYear);
  cy.get('select[data-qa="country"]').select(country);

  cy.get('input[data-qa="password"]').type(password, { log: false });
  cy.get('input[data-qa="first_name"]').type(firstName);
  cy.get('input[data-qa="last_name"]').type(lastName);
  cy.get('input[data-qa="company"]').type(company);
  cy.get('input[data-qa="address"]').type(address1);
  cy.get('input[data-qa="address2"]').type(address2);
  cy.get('input[data-qa="state"]').type(state);
  cy.get('input[data-qa="city"]').type(city);
  cy.get('input[data-qa="zipcode"]').type(zipcode);
  cy.get('input[data-qa="mobile_number"]').type(mobileNumber);

  cy.get('button[data-qa="create-account"]').click();

  userListToDelete.push({ email, password });
}

export function login(email, password) {
  moveToLoginPage();

  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password, { log: false });

  cy.get('button[data-qa="login-button"]').click();
}

export function fillSignupForm(name, email) {
  cy.get('input[data-qa="signup-name"]').type(name);
  cy.get('input[data-qa="signup-email"]').type(email);

  cy.get('button[data-qa="signup-button"]').click();
}

export function logout() {
  cy.get('a[href="/logout"]').click();
}

export function viewErrorMessage(message) {
  cy.get("p").contains(message);
}
