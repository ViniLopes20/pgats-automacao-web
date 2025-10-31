/// <reference types="cypress"/>

export function goToCheckout() {
  cy.get("a.check_out").click();
}

export function viewProductAddToCart(productIdList) {
  cy.get('tr[id^="product-"]').should("have.length", productIdList.length);

  productIdList.forEach((productId) => {
    cy.get(`tr#product-${productId}`).should("be.visible");
  });
}
