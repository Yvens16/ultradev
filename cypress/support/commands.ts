// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import authPo from './auth.po';
import organizationPageObject from './organization.po';

Cypress.Commands.add('cyGet', (name: string) => {
  return cy.get(createCySelector(name));
});

Cypress.Commands.add(
  'signIn',
  (redirectPath = '/', credentials = authPo.getDefaultUserCredentials()) => {
    cy.session(
      [
        Cypress.spec.name,
        redirectPath,
        credentials.email,
        credentials.password,
        // we use this to ensure tests are totally isolated and avoid random failures
        Math.random(),
      ],
      () => {
        cy.log(
          `Signing in programmatically and redirecting to ${redirectPath} ...`
        );

        cy.log(credentials.email, credentials.password);

        organizationPageObject.useDefaultOrganization();
        authPo.signInProgrammatically(credentials);

        cy.log(`Successfully signed in`);
      }
    );

    cy.visit(redirectPath);
    cy.wait(500);
  }
);

Cypress.Commands.add(`clearStorage`, () => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb');
});

Cypress.Commands.add(`signOutSession`, () => {
  cy.request(`POST`, `/auth/sign-out`);
});

export function createCySelector(name: string) {
  return `[data-cy="${name}"]`;
}
