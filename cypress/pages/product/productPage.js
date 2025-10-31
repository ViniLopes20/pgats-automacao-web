/// <reference types="cypress"/>

export function addProductsToCart(productIdList) {
  productIdList.forEach((productId) => {
    cy.get(`a[data-product-id="${productId}"]`).first().click();

    cy.get("div.modal-content")
      .should("be.visible")
      .and("contain.text", "Your product has been added to cart.");

    cy.get("button[data-dismiss='modal']").click();
  });
}

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
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productName);
  }
  if (productCategory) {
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productCategory);
  }
  if (productPrice) {
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productPrice);
  }
  if (productAvailability) {
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productAvailability);
  }
  if (productCondition) {
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productCondition);
  }
  if (productBrand) {
    cy.get("div.product-information")
      .should("be.visible")
      .and("contain.text", productBrand);
  }
}
