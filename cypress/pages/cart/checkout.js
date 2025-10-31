/// <reference types="cypress"/>

import { viewProductAddToCart } from "../../pages/cart/cartPage.js";
import accountData from "../../fixtures/accountData.json";
import paymentData from "../../fixtures/paymentData.json";

export function fillOrderObservation(message) {
  cy.get("textarea[name='message']").type(message);
}

export function fillPaymentDetails() {
  cy.get("input[data-qa='name-on-card']").type(paymentData.cardName);
  cy.get("input[data-qa='card-number']").type(paymentData.cardNumber);
  cy.get("input[data-qa='cvc']").type(paymentData.cardCVC);
  cy.get("input[data-qa='expiry-month']").type(paymentData.cardExpiryMonth);
  cy.get("input[data-qa='expiry-year']").type(paymentData.cardExpiryYear);

  cy.get("button[data-qa='pay-button']").click();
}

export function goToPayment() {
  cy.get('a[href="/payment"]').click();
}

export function viewCheckoutDetails(productIdList, totalPrice) {
  const userData = {
    name: `${accountData[1].gender}. ${accountData[1].firstName} ${accountData[1].lastName}`,
    company: accountData[1].company,
    address: accountData[1].address1,
    city: accountData[1].city,
    state: accountData[1].state,
    zipcode: accountData[1].zipcode,
    country: accountData[1].country,
    mobile_number: accountData[1].mobileNumber,
  };

  Object.values(userData).forEach((field) => {
    cy.get("ul#address_delivery").should("contain.text", field);
    cy.get("ul#address_invoice").should("contain.text", field);
  });

  viewProductAddToCart(productIdList);

  cy.get("p.cart_total_price").last().should("contain.text", totalPrice);
}
