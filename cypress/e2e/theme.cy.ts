import { themingPo } from '../support/theming.po';

describe(`Theming`, () => {
  describe('When using the default settings', () => {
    it('should use the light theme', () => {
      cy.visit('/');

      themingPo.assertIsLightTheme();
    });
  });

  describe('When setting the dark theme', () => {
    it('should use the dark theme', () => {
      cy.visit('/');

      themingPo.toggleDarkMode();
      themingPo.assertIsDarkTheme();

      // check it persists across reloads
      cy.reload();

      themingPo.assertIsDarkTheme();
    });
  });

  describe('When setting the system theme', () => {
    it('should use the selected system theme', () => {
      cy.visit('/');

      themingPo.toggleSystemMode();
      themingPo.assertIsCorrectSystemTheme();
    });
  });
});
