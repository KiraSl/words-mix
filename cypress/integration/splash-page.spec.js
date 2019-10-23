/// <reference types="Cypress" />

context('Splash page', () => {
  it('should render the default html', () => {
    cy.visit('./index.html');
    cy.get('.container-main-page .button').should('contain', 'Start Game');
    cy.get('.container-main-page p').should('contain', 'Lorem ipsum dolor sit amet consectetur adipisicing elit');
  });
});
