/// <reference types="cypress"/>

import { moveToLoginPage } from "../utils/navigation.js";
import accountData from "../../fixtures/accountData.json";

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
  const userData = {
    bornDay: bornDay ?? accountData[0].bornDay,
    bornMonth: bornMonth ?? accountData[0].bornMonth,
    bornYear: bornYear ?? accountData[0].bornYear,
    firstName: firstName ?? accountData[0].firstName,
    lastName: lastName ?? accountData[0].lastName,
    company: company ?? accountData[0].company,
    address1: address1 ?? accountData[0].address1,
    address2: address2 ?? accountData[0].address2,
    country: country ?? accountData[0].country,
    state: state ?? accountData[0].state,
    city: city ?? accountData[0].city,
    zipcode: zipcode ?? accountData[0].zipcode,
    mobileNumber: mobileNumber ?? accountData[0].mobileNumber,
    gender: gender ?? accountData[0].gender,
  };

  moveToLoginPage();

  fillSignupForm(name, email);

  cy.get('input[type="radio"]').check(userData.gender);
  cy.get("input#newsletter").check();
  cy.get("input#optin").check();

  cy.get('select[data-qa="days"]').select(userData.bornDay);
  cy.get('select[data-qa="months"]').select(userData.bornMonth);
  cy.get('select[data-qa="years"]').select(userData.bornYear);
  cy.get('select[data-qa="country"]').select(userData.country);

  cy.get('input[data-qa="password"]').type(password, { log: false });
  cy.get('input[data-qa="first_name"]').type(userData.firstName);
  cy.get('input[data-qa="last_name"]').type(userData.lastName);
  cy.get('input[data-qa="company"]').type(userData.company);
  cy.get('input[data-qa="address"]').type(userData.address1);
  cy.get('input[data-qa="address2"]').type(userData.address2);
  cy.get('input[data-qa="state"]').type(userData.state);
  cy.get('input[data-qa="city"]').type(userData.city);
  cy.get('input[data-qa="zipcode"]').type(userData.zipcode);
  cy.get('input[data-qa="mobile_number"]').type(userData.mobileNumber);

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
