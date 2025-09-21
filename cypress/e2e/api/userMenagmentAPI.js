/// <reference types="cypress" />

import { userListToDelete } from "../../pages/login/loginPage.js";

export function createUserViaAPI(name, email, password) {
  const params = {
    name: name,
    email: email,
    password: password,
    title: "Mr",
    birth_date: "24",
    birth_month: "June",
    birth_year: "1987",
    firstname: "Leo",
    lastname: "Messi",
    company: "Inter Miami CF",
    address1: "1350 NW 55th St",
    country: "United States",
    zipcode: "33309",
    state: "FL",
    city: "Fort Lauderdale",
    mobile_number: "305-358-3535",
  };
  return cy
    .request({
      method: "POST",
      url: "https://automationexercise.com/api/createAccount",
      form: true,
      body: params,
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status !== 200 || !response.body.includes("User created!")) {
        throw new Error(
          `Error to create user: status ${response.status}, response: ${response.body}`
        );
      }
      userListToDelete.push({ email, password });
      return response;
    });
}

export function deleteUserViaAPI(email, password) {
  return cy
    .request({
      method: "DELETE",
      url: "https://automationexercise.com/api/deleteAccount",
      form: true,
      body: {
        email,
        password,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      if (
        response.status !== 200 ||
        !response.body.includes("Account deleted!")
      ) {
        throw new Error(
          `Error to delete user: status ${response.status}, response: ${response.body}`
        );
      }
      return response;
    });
}
