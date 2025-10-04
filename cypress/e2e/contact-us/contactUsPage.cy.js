/// <reference types="cypress" />

import {
  sendContactUsMessageForm,
  viewFormSubmissionSuccessMessage,
} from "../../pages/contact-us/contactPage.js";
import { launchCommercePlatform } from "../../pages/utils/navigation.js";
import contactUsData from "../../fixtures/contactUsData.json";

beforeEach(() => {
  launchCommercePlatform();
});

describe("Tests Cases related to Contact Us Page", () => {
  it("Check that is possible to submit the form of the Contact Us page", () => {
    sendContactUsMessageForm(
      contactUsData.name,
      contactUsData.email,
      contactUsData.subject,
      contactUsData.message,
      contactUsData.filePath
    );

    viewFormSubmissionSuccessMessage();
  });
});
