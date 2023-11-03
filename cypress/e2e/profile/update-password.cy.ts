import profilePo from '../../support/profile.po';
import configuration from '~/configuration';
import authPo from '../../support/auth.po';

describe(`Update Password`, () => {
  const existingEmailAddress = `new-password@makerkit.dev`;
  const currentPassword = authPo.getDefaultUserPassword();
  const newPassword = `newpassword`;

  function fillForm(params: {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
  }) {
    profilePo.$getCurrentPasswordInput().clear().type(params.currentPassword);
    profilePo.$getNewPasswordInput().clear().type(params.newPassword);
    profilePo.$getRepeatNewPasswordInput().clear().type(params.repeatPassword);

    profilePo.$getUpdatePasswordForm().submit();
  }

  function signIn() {
    cy.signIn(`/settings/profile/password`, {
      email: existingEmailAddress,
      password: currentPassword,
    });
  }

  describe(`When the passwords do not match`, () => {
    it('should display an error on the repeat password input', () => {
      signIn();

      fillForm({
        currentPassword,
        newPassword,
        repeatPassword: 'anotherpassword',
      });

      cy.cyGet('repeat-password-error').should(
        `contain.text`,
        `Passwords do not match. Make sure you're using the correct password`
      );
    });
  });

  describe(`When the password is the same as the current password`, () => {
    it('should display an error on the new password input', () => {
      signIn();

      fillForm({
        currentPassword,
        newPassword: currentPassword,
        repeatPassword: currentPassword,
      });

      cy.cyGet('new-password-error').should(
        `contain.text`,
        `Your password has not changed`
      );
    });
  });

  describe(`When the user enters the wrong password`, () => {
    it('should display an alert', () => {
      signIn();

      fillForm({
        currentPassword: 'wrongpassword',
        newPassword: newPassword,
        repeatPassword: newPassword,
      });

      profilePo.$getUpdatePasswordErrorAlert().should(`be.visible`);
    });
  });

  describe(`When updating the password and the passwords do match`, () => {
    it('should remove the error alert and successfully execute the operation', () => {
      signIn();

      fillForm({
        currentPassword,
        newPassword: newPassword,
        repeatPassword: newPassword,
      });

      profilePo.$getUpdatePasswordErrorAlert().should('not.exist');

      profilePo.$getCurrentPasswordInput().invoke('val').should('be.empty');
      profilePo.$getNewPasswordInput().invoke('val').should('be.empty');
      profilePo.$getRepeatNewPasswordInput().invoke('val').should('be.empty');
    });
  });

  describe('When logging in with the new password', () => {
    it('should work', () => {
      authPo.signInProgrammatically({
        email: existingEmailAddress,
        password: newPassword,
      });

      const redirectPath = configuration.paths.appHome;

      cy.visit(redirectPath);
      cy.url().should('contain', redirectPath);
    });
  });
});
