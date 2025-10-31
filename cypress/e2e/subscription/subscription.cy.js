/// <reference types="cypress" />

import { launchCommercePlatform } from "../../pages/utils/navigation.js";
import { scrollToElement } from "../../pages/utils/general.js";

beforeEach(() => {
  launchCommercePlatform();
});

describe("Test Case related to Subscription", () => {
  it("TC10 - Check that is possible to subscribe a email", () => {
    const Chance = require("chance");
    const chance = new Chance();

    scrollToElement("footer#footer");

    cy.get("input#susbscribe_email").type(chance.email());
    cy.get("button#subscribe").click();

    cy.get("div#success-subscribe")
      .should("be.visible")
      .and("contain.text", "You have been successfully subscribed!");
  });
});
