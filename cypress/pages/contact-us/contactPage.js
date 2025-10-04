/// <reference types="cypress"/>

import { moveToContactUsPage } from "../utils/navigation.js";
import contactUsData from "../../fixtures/contactUsData.json";

export function sendContactUsMessageForm(
  name,
  email,
  subject,
  message,
  filePath
) {
  moveToContactUsPage();

  cy.get('input[data-qa="name"]').type(name);
  cy.get('input[data-qa="email"]').type(email);
  cy.get('input[data-qa="subject"]').type(subject);
  cy.get('textarea[data-qa="message"]').type(message);

  cy.get('input[type="file"]').selectFile(filePath);

  cy.get('input[data-qa="submit-button"]').click();
}

export function viewFormSubmissionSuccessMessage() {
  cy.get(".alert-success").should("contain.text", contactUsData.successMessage);
}
