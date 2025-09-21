/// <reference types="cypress"/>

export function moveToLoginPage() {
  cy.get('a[href="/login"]').click();
}

export function launchCommercePlatform() {
  cy.visit("https://www.automationexercise.com");
}
