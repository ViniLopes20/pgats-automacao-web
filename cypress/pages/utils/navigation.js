/// <reference types="cypress"/>

export function moveToLoginPage() {
  cy.get('a[href="/login"]').click();
}

export function moveToContactUsPage() {
  cy.get('a[href="/contact_us"]').click();
}

export function moveToProductPage() {
  cy.get('a[href="/products"]').click();
}

export function launchCommercePlatform() {
  cy.visit("https://www.automationexercise.com");
}
