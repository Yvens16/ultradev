import organizationPageObject from '../../support/organization.po';
import { encodeCookie } from '~/core/generic/cookies';

describe(`Create Organization`, () => {
  const organizationName = `New Organization`;

  const defaultOrganizationId = encodeCookie(
    organizationPageObject.getDefaultOrganizationId()
  );

  it('should be able to create a new organization and set it as the currently selected one', () => {
    cy.signIn(`/dashboard`);

    organizationPageObject
      .$currentOrganization()
      .wait(100)
      .should('be.visible')
      .click();

    organizationPageObject.$createOrganizationButton().click();

    organizationPageObject
      .$createOrganizationNameInput()
      .type(organizationName);

    organizationPageObject.$confirmCreateOrganizationButton().click();

    organizationPageObject
      .$currentOrganization()
      .should('contain', organizationName);

    cy.getCookie('organizationId').should(
      'not.have.property',
      'value',
      defaultOrganizationId
    );
  });
});
