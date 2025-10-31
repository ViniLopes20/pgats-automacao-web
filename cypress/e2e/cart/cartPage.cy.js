/// <reference types="cypress" />

import { login, userListToDelete } from "../../pages/login/loginPage.js";
import { addProductsToCart } from "../../pages/product/productPage.js";
import { assertUrlContainsPath } from "../../pages/utils/general.js";
import {
  goToCheckout,
  viewProductAddToCart,
} from "../../pages/cart/cartPage.js";
import {
  fillOrderObservation,
  fillPaymentDetails,
  goToPayment,
  viewCheckoutDetails,
} from "../../pages/cart/checkout.js";
import {
  launchCommercePlatform,
  moveToChart,
} from "../../pages/utils/navigation.js";
import {
  createUserViaAPI,
  deleteUserViaAPI,
} from "../../api/userMenagmentAPI.js";

const Chance = require("chance");
const chance = new Chance();

const userData = {
  name: chance.name(),
  email: chance.email(),
  password: chance.hash(),
};

beforeEach(() => {
  createUserViaAPI(userData);

  launchCommercePlatform();
});

describe("Tests Cases related to Checkout", () => {
  it("TC15 - Check that is possible to finish the checkout process", () => {
    const productIdList = [1, 2, 4];
    const totalPrice = "Rs. 2400";

    login(userData.email, userData.password);

    addProductsToCart(productIdList);

    moveToChart();

    assertUrlContainsPath("/view_cart");
    viewProductAddToCart(productIdList);

    goToCheckout();

    assertUrlContainsPath("/checkout");
    viewCheckoutDetails(productIdList, totalPrice);

    fillOrderObservation("Please deliver between 9 AM to 5 PM.");

    goToPayment();

    assertUrlContainsPath("/payment");

    fillPaymentDetails();

    cy.get('[data-qa="order-placed"]').should("be.visible");
  });
});

afterEach(() => {
  if (userListToDelete?.length) {
    for (const user of userListToDelete) {
      deleteUserViaAPI(user.email, user.password);
    }
    userListToDelete.length = 0;
  }
});
