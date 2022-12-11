import organizationPageObject from '../../support/organization.po';
import { encodeCookie } from '~/core/generic/cookies';

describe(`Create Organization`, () => {
  const organizationName = `New Organization`;

  const defaultOrganizationId = encodeCookie(
    organizationPageObject.getDefaultOrganizationId()
  );

  describe(`Given the user updates the organization name and logo`, () => {
    it('the current selected organization will be the one created', () => {
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
});
