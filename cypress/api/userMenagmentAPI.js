/// <reference types="cypress" />

import { userListToDelete } from "../pages/login/loginPage.js";
import accountData from "../fixtures/accountData.json";

export function createUserViaAPI(payload) {
  const params = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    title: payload.gender ?? accountData[1].gender,
    birth_date: payload.bornDay ?? accountData[1].bornDay,
    birth_month: payload.bornMonth ?? accountData[1].bornMonth,
    birth_year: payload.bornYear ?? accountData[1].bornYear,
    firstname: payload.firstName ?? accountData[1].firstName,
    lastname: payload.lastName ?? accountData[1].lastName,
    company: payload.company ?? accountData[1].company,
    address1: payload.address1 ?? accountData[1].address1,
    country: payload.country ?? accountData[1].country,
    zipcode: payload.zipcode ?? accountData[1].zipcode,
    state: payload.state ?? accountData[1].state,
    city: payload.city ?? accountData[1].city,
    mobile_number: payload.mobileNumber ?? accountData[1].mobileNumber,
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
      userListToDelete.push({
        email: payload.email,
        password: payload.password,
      });

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
