/// <reference types="cypress" />

import {
  searchForProduct,
  viewProductDetails,
} from "../../pages/product/productPage.js";
import { launchCommercePlatform } from "../../pages/utils/navigation.js";
import { assertUrlContainsPath } from "../../pages/utils/general.js";

import {
  moveToProductPage,
  moveToProductDetails,
} from "../../pages/utils/navigation.js";

beforeEach(() => {
  launchCommercePlatform();
});

describe("Tests Cases related to Product Page", () => {
  it("TC08 - Check that is possible to access the product list and product details", () => {
    const productId = 1;
    const productName = "Blue Top";
    const productCategory = "Women > Tops";
    const productPrice = "500";
    const productAvailability = "In Stock";
    const productCondition = "New";
    const productBrand = "Polo";

    moveToProductPage();

    assertUrlContainsPath("/products");
    cy.get("div.features_items").should("be.visible");
    cy.get("h2.title").should("be.visible").and("have.text", "All Products");
    cy.get('a[href="/product_details/1"]').should("be.visible");

    moveToProductDetails(productId);

    assertUrlContainsPath(`/product_details/${productId}`);
    viewProductDetails(
      productName,
      productCategory,
      productPrice,
      productAvailability,
      productCondition,
      productBrand
    );
  });

  it("TC09 - Check that is possible to search for a product", () => {
    moveToProductPage();

    assertUrlContainsPath("/products");
    cy.get("h2.title").should("be.visible").and("have.text", "All Products");

    const searchTerm = "Pink";
    searchForProduct(searchTerm);

    assertUrlContainsPath(`/products?search=${searchTerm}`);
    cy.get("h2.title")
      .should("be.visible")
      .and("have.text", "Searched Products");
    cy.get("div.productinfo p")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        expect($el.text()).to.include(searchTerm);
      });
  });
});
