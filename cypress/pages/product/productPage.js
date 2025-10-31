/// <reference types="cypress"/>

export function searchForProduct(searchTerm) {
  cy.get("input#search_product").type(searchTerm);
  cy.get("button#submit_search").click();
}

export function viewProductDetails(
  productName,
  productCategory,
  productPrice,
  productAvailability,
  productCondition,
  productBrand
) {
  if (productName) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productName);
  }
  if (productCategory) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productCategory);
  }
  if (productPrice) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productPrice);
  }
  if (productAvailability) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productAvailability);
  }
  if (productCondition) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productCondition);
  }
  if (productBrand) {
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", productBrand);
  }
}
