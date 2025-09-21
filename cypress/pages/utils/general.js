/// <reference types="cypress"/>

export function assertUrlContainsPath(path) {
  cy.url().should("include", path);
}
