import organizationPageObject from '../../support/organization.po';

describe(`Create Organization`, () => {
  const organizationName = `New Organization`;

  it('should be able to create a new organization and set it as the currently selected one', () => {
    cy.signIn(`/dashboard`);

    organizationPageObject.createOrganization(organizationName);
    organizationPageObject.assertCurrentOrganization(organizationName);
  });
});
