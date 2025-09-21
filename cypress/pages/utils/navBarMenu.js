/// <reference types="cypress"/>

export function viewLogoutButtonNotPresent() {
  cy.get('a[href="/logout"]').should("not.exist");
}

export function viewLogoutButtonPresent() {
  cy.get('a[href="/logout"]').should("be.visible");
}

export function viewUserIconNotPresent() {
  cy.get(".fa-user").should("not.exist");
}
