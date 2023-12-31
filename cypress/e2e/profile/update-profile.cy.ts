import profilePo from '../../support/profile.po';

const newDisplayName = `Makerkit Guy`;

describe(`Update Profile`, () => {
  describe(`When updating the user Display name`, () => {
    it('should store the new display name', () => {
      cy.signIn(`/settings/profile`);

      profilePo.$getDisplayNameInput().type(newDisplayName);
      profilePo.$getUpdateProfileForm().submit();

      cy.wait(250);
      cy.reload();

      profilePo
        .$getDisplayNameInput()
        .then(($el) => $el.val())
        .should('equal', newDisplayName);
    });
  });
});
