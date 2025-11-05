/// <reference types="cypress" />

describe('ScentRank – Parfumliste & Bewertungen', () => {
  beforeEach(() => {
    // Match the exact URL that the Angular app will call
    cy.intercept('GET', 'http://localhost:4200/api/perfumes', {
      fixture: 'perfumes.json'
    }).as('getPerfumes');

    cy.visit('http://localhost:4200');

    cy.wait('@getPerfumes', { timeout: 300000 });
  });

  it('zeigt alle Parfums aus dem Mock an', () => {
    cy.get('.perfume-card', { timeout: 10000 })
      .should('have.length', 3)
      .first()
      .should('contain.text', 'Acqua di Parma Colonia');
  });

  it('zeigt die korrekten Ratings an', () => {
    cy.get('.perfume-card .rating-value', { timeout: 10000 })
      .first()
      .should('not.contain', '—')
      .and('contain', '4.5');

    cy.get('.perfume-card').eq(1)
      .find('.rating-value')
      .should('contain', '3.0');
  });

  it('bewertet ein Parfum und aktualisiert die Anzeige', () => {
    cy.intercept('POST', 'http://localhost:4200/api/perfumes/1/rate?stars=5', {
      id: 1,
      name: 'Acqua di Parma Colonia',
      avgRating: 4.8,
      ratingsCount: 11,
    }).as('ratePerfume');

    cy.intercept('GET', 'http://localhost:4200/api/perfumes', {
      fixture: 'perfumes_after_rating.json'
    }).as('getPerfumesUpdated');

    cy.get('.perfume-card')
      .first()
      .find('.star-button')
      .contains('5★')
      .click();

    cy.wait('@ratePerfume', { timeout: 10000 });
    cy.wait('@getPerfumesUpdated', { timeout: 10000 });

    cy.get('.perfume-card').first().find('.rating-value').should('contain', '4.8');
    cy.get('.perfume-card').first().find('.rating-count').should('contain', '11 Bewertung');
  });
});
