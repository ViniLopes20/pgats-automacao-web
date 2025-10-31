/// <reference types="cypress"/>

export function assertUrlContainsPath(path) {
  cy.url().should("include", path);
}

export function scrollToElement(selectorToScroll) {
  cy.get(selectorToScroll).scrollIntoView();
}
